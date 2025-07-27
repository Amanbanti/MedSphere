-- MedSphere database baseline — PostgreSQL extensions and role notes
-- Apply before first Prisma migration in production:
--   psql $DATABASE_URL -f scripts/migrations/baseline.sql

-- Required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Optional: pg_trgm for fuzzy patient search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ---------------------------------------------------------------------------
-- Role model (run as superuser; adjust passwords via secrets manager)
-- ---------------------------------------------------------------------------
-- Application role: least privilege for NestJS services
-- CREATE ROLE medsphere_app LOGIN PASSWORD 'set-via-vault';
-- GRANT CONNECT ON DATABASE medsphere TO medsphere_app;
-- GRANT USAGE ON SCHEMA public TO medsphere_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO medsphere_app;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public
--   GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO medsphere_app;

-- Migration role: used by CI/CD db-migrate workflow only
-- CREATE ROLE medsphere_migrate LOGIN PASSWORD 'set-via-vault';
-- GRANT medsphere_app TO medsphere_migrate;
-- GRANT CREATE ON SCHEMA public TO medsphere_migrate;

-- Read-only analytics role
-- CREATE ROLE medsphere_readonly LOGIN PASSWORD 'set-via-vault';
-- GRANT CONNECT ON DATABASE medsphere TO medsphere_readonly;
-- GRANT USAGE ON SCHEMA public TO medsphere_readonly;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO medsphere_readonly;

-- Audit / break-glass role — requires MFA and session logging
-- CREATE ROLE medsphere_breakglass LOGIN PASSWORD 'set-via-vault' VALID UNTIL 'infinity';
-- COMMENT ON ROLE medsphere_breakglass IS 'Emergency PHI access — HIPAA audit required';

-- Session settings recommended for production
-- ALTER DATABASE medsphere SET timezone TO 'UTC';
-- ALTER DATABASE medsphere SET log_statement TO 'ddl';
-- ALTER DATABASE medsphere SET log_connections TO on;

COMMENT ON EXTENSION pgcrypto IS 'MedSphere: UUID generation and cryptographic functions';
