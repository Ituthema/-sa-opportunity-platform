# Security and Privacy Baseline

## 1. Scope

This is a baseline for design and implementation. It is not a claim of legal compliance, a completed security audit or a substitute for professional legal advice. Review applicable South African law, including POPIA, before launch and before introducing any personal-data processing beyond basic admin operations.

## 2. Data minimisation

The initial platform is an opportunity information service, not an application portal. Do not collect applicant CVs, identity documents, passport details, bank details, health information, demographic profiles, application fees or other sensitive applicant data.

Collect only the minimum information needed to operate the editorial service. Admin account information and security logs must be limited, access-controlled and retained only as necessary.

## 3. Public repository precautions

The repository is currently public. Never commit:

- Passwords, API keys, access tokens or session secrets.
- Private keys, certificates containing private key material or recovery codes.
- Database credentials or production connection strings.
- Real applicant information or private correspondence.
- Private evidence files or confidential internal notes.
- Backup archives containing private operational data.

Use local environment files only when excluded from Git, and provide a safe example file containing placeholders only. Rotate a secret immediately if it is accidentally exposed. Do not assume deleting a committed secret removes it from Git history.

## 4. Admin authentication and authorisation

Admin security must be enforced on the server for every protected request. Do not rely on client-side route guards or hidden navigation.

Before real use, implement and test:

- Strong password hashing with a maintained algorithm and library.
- Secure session creation, expiry and invalidation.
- HTTPS-only, HTTP-only and appropriately SameSite cookies.
- CSRF protection for state-changing operations.
- Login throttling and abuse protection.
- Secure account recovery that does not disclose whether an account exists.
- Least-privilege roles and server-side role checks.
- Audit events for login, failed login, record changes, approval, publication and account-security changes.

Do not build custom cryptography. Do not store plaintext passwords or log credentials.

## 5. Application security

Validate all input on the server. Use parameterised SQL. Escape untrusted content when rendering HTML. Restrict public data queries to approved published fields. Apply appropriate security headers and content security policy after testing the application's actual requirements. Keep dependencies maintained and review vulnerabilities.

Do not weaken TLS certificate verification to work around a source or provider connection problem.

## 6. Privacy operations

Before public launch, document what personal information is processed, why it is necessary, where it is stored, who can access it, how long it is retained, how it is protected, and how requests or incidents are handled. Provide a clear privacy notice and contact route appropriate to the actual operating model.

Do not claim POPIA compliance merely because a privacy page exists.

## 7. Backups and incidents

Backups containing private admin or operational data must be stored privately, not in this public repository. Protect downloaded backups on the Android device. Establish a process for access revocation, credential rotation, incident recording and recovery testing.

## 8. Launch gate

Do not put real user data or production admin credentials into the system until authentication, authorisation, CSRF protection, input validation, logging, backup and restore procedures have been implemented and tested.
