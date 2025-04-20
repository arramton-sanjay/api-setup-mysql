import { Knex } from 'knex';
import { getMigrationMetadata } from '../lib/utils';
import KnexDB from '../loaders/knex';

async function runMigrationsWithMetadata(knex: Knex) {
    const [batchNo, completedMigrations] = await knex.migrate.latest();
    const metadata = getMigrationMetadata()

    console.log('🟢 Migration intialized by: ', metadata);
    // Inserting logs for each new migration
    for (const migrationFile of completedMigrations) {
        console.log('🟢 Running Migration for: ', migrationFile);
        await knex('migration_logs').insert({
            migration_name: migrationFile,
            created_by: metadata.created_by,
            system_info: metadata.system_info,
            migration_time: new Date(),
        });
    }
}

async function main() {
    const knex = KnexDB.connect();
    try {
        await runMigrationsWithMetadata(knex);
        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await knex.destroy();
    }
}



main();

