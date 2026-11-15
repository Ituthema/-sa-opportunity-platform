import test from "node:test";
import assert from "node:assert/strict";
import {
  findPublishedOpportunityBySlug,
  listPublishedOpportunities,
} from "../src/lib/opportunities/repository.js";

function createDatabase({ firstResult = null, allResults = [] } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      const call = { sql, values: [] };
      calls.push(call);
      return {
        bind(...values) {
          call.values = values;
          return this;
        },
        async first() {
          return firstResult;
        },
        async all() {
          return { results: allResults, success: true };
        },
      };
    },
  };
}

test("finds only published opportunities using a bound slug", async () => {
  const row = { id: "op-1", slug: "sample", status: "published" };
  const db = createDatabase({ firstResult: row });

  const result = await findPublishedOpportunityBySlug(db, " sample ");

  assert.equal(result, row);
  assert.match(db.calls[0].sql, /status = 'published'/);
  assert.deepEqual(db.calls[0].values, ["sample"]);
});

test("returns null for an empty slug without querying the database", async () => {
  const db = createDatabase();
  assert.equal(await findPublishedOpportunityBySlug(db, "  "), null);
  assert.equal(db.calls.length, 0);
});

test("lists published records and binds optional filters and bounded limit", async () => {
  const rows = [{ id: "op-1" }];
  const db = createDatabase({ allResults: rows });

  const result = await listPublishedOpportunities(db, {
    category: "learnership",
    province: "Mpumalanga",
    limit: 500,
  });

  assert.deepEqual(result, rows);
  assert.match(db.calls[0].sql, /status = 'published'/);
  assert.deepEqual(db.calls[0].values, ["learnership", "Mpumalanga", 50]);
});

test("uses a safe default limit and does not interpolate filter values", async () => {
  const db = createDatabase();

  await listPublishedOpportunities(db, {
    category: "bursary' OR 1=1 --",
  });

  assert.match(db.calls[0].sql, /category = \?/);
  assert.deepEqual(db.calls[0].values, ["bursary' OR 1=1 --", 20]);
});
