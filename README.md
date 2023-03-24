<!-- TO GENERATE TYPING :  -->
npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > src/types/supabase.ts

<!-- TO SAVE THE SCHEMA TABLE  -->
pg_dump --schema-only  'postgres://postgres:[databasepassword]@db.qkrqhdmxideutjqbfclw.supabase.co:6543/postgres' > database-dump.sql



## Nice to know

1. Generate typing in your project when data schema in updated in supabase: 

 ```sh
   npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > src/types/supabase.ts
   ```

2. Generate the tables in supabase : go to the SQL editor and use the script in the file database-dump.sql 

3. Save the schema of yoour database in database-dump => find your Connection string in setting / database and use this script :

```sh
pg_dump --schema-only  'postgres://postgres:[databasepassword]@db.[project-id].supabase.co:6543/postgres' > database-dump.sql
   ```

4. TO DELETE COMPANIES WITH NO PROFILE IN IT

```sh
DELETE FROM
  companies
WHERE
  id NOT IN (
    SELECT
      profile."companyId"
    FROM
      profiles profile
  )
   ```
