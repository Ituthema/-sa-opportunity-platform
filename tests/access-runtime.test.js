import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { test } from "node:test";

const root = process.cwd();
const fixture = "tests/fixtures/access-runtime";
const astro = "node_modules/astro/astro.js";

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

async function withPreview(config, port, callback) {
  const child = spawn(
    process.execPath,
    [
      astro,
      "preview",
      "--root",
      fixture,
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: root,
      env: {
        ...process.env,
        SAOP_ACCESS_WRANGLER_CONFIG: config,
      },
      stdio: "inherit",
    },
  );

  try {
    let response;
    let lastError;
    const url = `http://127.0.0.1:${port}/access-probe`;

    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (child.exitCode !== null) {
        throw new Error(`Astro preview exited early with code ${child.exitCode}`);
      }
      try {
        response = await fetch(url);
        break;
      } catch (error) {
        lastError = error;
        await delay(250);
      }
    }

    if (!response) {
      throw new Error(`Astro preview did not become ready: ${lastError}`);
    }

    assert.equal(response.status, 200);
    await callback(await response.json());
  } finally {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      delay(3000),
    ]);
    if (child.exitCode === null) child.kill("SIGKILL");
  }
}

test("Astro Cloudflare Access context feasibility", async (t) => {
  run("npx", ["--no-install", "astro", "build", "--root", fixture]);

  await t.test("without an Access simulation, context is absent", async () => {
    await withPreview("wrangler.no-access.jsonc", 8791, async (body) => {
      assert.equal(body.accessAvailable, false);
      assert.equal(body.identityEmail, null);
    });
  });

  await t.test("Access simulation with Static Assets", async () => {
    await withPreview("wrangler.access-assets.jsonc", 8792, async (body) => {
      assert.equal(body.accessAvailable, false);
      assert.equal(body.identityEmail, null);
    });
  });

  await t.test("Access simulation without Static Assets", async () => {
    await withPreview("wrangler.access-no-assets.jsonc", 8793, async (body) => {
      assert.equal(body.accessAvailable, true);
      assert.equal(body.identityEmail, "access-test@example.invalid");
    });
  });
});
