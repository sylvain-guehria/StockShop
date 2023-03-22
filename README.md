<!-- TO GENERATE TYPING :  -->
npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > src/types/supabase.ts

<!-- TO SAVE THE SCHEMA TABLE  -->
pg_dump --schema-only  'postgres://postgres:[databasepassword]@db.qkrqhdmxideutjqbfclw.supabase.co:6543/postgres' > database-dump.sql

<!-- TO DELETE COMPANIES WITH NO PROFILE IN IT -->
DELETE FROM
  companies
WHERE
  id NOT IN (
    SELECT
      profile."companyId"
    FROM
      profiles profile
  )
