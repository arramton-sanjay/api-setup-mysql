// Comment: In this file system_info col type changed to string instead of json !!
import type { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('seed_logs', (table) => {
        table.string('system_info').alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('seed_logs', (table) => {
        table.json('system_info').alter(); 
      });
}
