-- Initial, portable SQLite/D1 schema.
-- No production records or personal applicant data are inserted by this migration.

CREATE TABLE opportunities (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (
    category IN ('learnership', 'internship', 'apprenticeship', 'bursary', 'graduate_programme')
  ),
  province TEXT,
  organisation_name TEXT,
  source_url TEXT NOT NULL,
  closing_date TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'awaiting_verification', 'verified',
               'awaiting_approval', 'approved', 'published',
               'closed', 'archived', 'rejected')
  ),
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (status <> 'published' OR published_at IS NOT NULL)
);

CREATE INDEX idx_opportunities_status_closing_date
  ON opportunities (status, closing_date);

CREATE INDEX idx_opportunities_status_category_closing_date
  ON opportunities (status, category, closing_date);

CREATE INDEX idx_opportunities_status_province_closing_date
  ON opportunities (status, province, closing_date);
