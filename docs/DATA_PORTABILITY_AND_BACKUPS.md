# Data Portability and Backup Requirements

## 1. Objectives

The platform must not trap its records in one hosting provider or database. It must be possible to export, inspect, back up, restore and migrate the complete operational dataset without depending on a proprietary dashboard.

## 2. Data design requirements

- Use stable internal IDs that do not change when titles or URLs change.
- Define explicit relationships and foreign keys.
- Keep schema changes in ordered, version-controlled SQL migration files.
- Document important fields, allowed values and relationships.
- Keep business rules outside provider-specific database features where practical.
- Preserve source references, verification events, editorial approvals and audit history.
- Preserve public slugs and maintain redirects when URLs change.

## 3. Export formats

Plan for at least:

- CSV for human inspection and spreadsheet work.
- JSON for structured interchange.
- SQL or a documented database-native export for full-fidelity backup and restore.

A flat opportunity CSV is not a complete backup. A complete export must include related organisations, sources, evidence metadata, reviewers, editorial decisions, audit history, schema/version information and relationship identifiers.

## 4. Backup policy

Before real editorial operations begin, define backup frequency, retention, encryption, storage location and recovery objectives. Keep at least one independent copy outside the hosting provider. Do not store private production backups in this public GitHub repository.

The owner should be able to download a backup to the Android device and move it to another secure storage location. Protect the device and backup files appropriately.

## 5. Restore testing

A backup is not proven until it has been restored successfully. Test restoration into a separate non-production database, verify record counts and relationships, and confirm that verification and audit history survive. Record the test date, method, result and any limitations.

## 6. Future database migration

The initial direction uses Cloudflare D1, which is SQLite-compatible. PostgreSQL is not identical. A future migration requires review and possible conversion of SQL types, constraints, indexes, queries, transaction assumptions and provider-specific behaviour.

Before such a migration, produce a mapping, test export/import on a copy, compare record counts and relationships, validate public URLs, and obtain explicit approval before switching production traffic.

## 7. Provider exit readiness

Document how to retrieve source code, database contents, static assets (if introduced), DNS settings and deployment configuration. Keep infrastructure settings and migration steps documented. Avoid dependencies that make the data unusable outside the original provider.
