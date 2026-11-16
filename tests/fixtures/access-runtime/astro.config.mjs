import cloudflare from "@astrojs/cloudflare";
import { resolve } from "node:path";
import { defineConfig } from "astro/config";

const wranglerConfig = process.env.SAOP_ACCESS_WRANGLER_CONFIG ?? "wrangler.no-access.jsonc";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: resolve(process.cwd(), "tests/fixtures/access-runtime", wranglerConfig),
    },
  }),
  session: false,
});
