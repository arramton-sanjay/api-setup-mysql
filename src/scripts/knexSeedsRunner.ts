import { Knex } from 'knex';
import { getMigrationMetadata } from '../lib/utils';
import KnexDB from '../loaders/knex';

async function runSeedsWithMetadata(knex: Knex) {
  const metadata = getMigrationMetadata();

  // Run seeds and get list of completed seed files
  const completedSeeds = await knex.seed.run();

  console.log('🟢 Seed initiated by: ', metadata);

  for (const seedFile of completedSeeds) {
    console.log('🟢 Ran seed for: ', seedFile);
    await knex('seed_logs').insert({
      seed_name: seedFile,
      created_by: metadata.created_by,
      system_info: metadata.system_info,
      seed_time: new Date(),
    });
  }
}

async function main() {
  const knex = KnexDB.connect();
  try {
    await runSeedsWithMetadata(knex);
    console.log('✅ Seeding completed successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
}

main();
