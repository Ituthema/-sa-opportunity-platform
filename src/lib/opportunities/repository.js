/**
 * Provider-isolated opportunity read operations.
 * The D1 binding is injected by the caller; this module never discovers
 * Cloudflare globals or accesses credentials directly.
 */

/**
 * @typedef {Object} PublishedOpportunity
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} category
 * @property {string | null} province
 * @property {string | null} organisation_name
 * @property {string} source_url
 * @property {string | null} closing_date
 * @property {string} published_at
 */

/**
 * @param {D1Database} db
 * @param {string} slug
 * @returns {Promise<PublishedOpportunity | null>}
 */
export async function findPublishedOpportunityBySlug(db, slug) {
  if (typeof slug !== "string" || slug.trim().length === 0) {
    return null;
  }

  const statement = db
    .prepare(
      `SELECT id, title, slug, category, province, organisation_name,
              source_url, closing_date, published_at
         FROM opportunities
        WHERE slug = ?1
          AND status = 'published'
        LIMIT 1`,
    )
    .bind(slug.trim());

  return statement.first();
}

/**
 * @param {D1Database} db
 * @param {{ category?: string, province?: string, limit?: number }} [filters]
 * @returns {Promise<PublishedOpportunity[]>}
 */
export async function listPublishedOpportunities(db, filters = {}) {
  const conditions = ["status = 'published'"];
  const values = [];

  if (filters.category) {
    conditions.push("category = ?");
    values.push(filters.category);
  }

  if (filters.province) {
    conditions.push("province = ?");
    values.push(filters.province);
  }

  const requestedLimit = Number.isInteger(filters.limit) ? filters.limit : 20;
  const limit = Math.min(Math.max(requestedLimit, 1), 50);
  values.push(limit);

  const sql = `SELECT id, title, slug, category, province, organisation_name,
                       source_url, closing_date, published_at
                  FROM opportunities
                 WHERE ${conditions.join(" AND ")}
                 ORDER BY closing_date IS NULL, closing_date ASC, published_at DESC
                 LIMIT ?`;

  const result = await db.prepare(sql).bind(...values).all();
  return result.results ?? [];
}
