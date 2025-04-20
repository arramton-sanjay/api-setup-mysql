import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('seed_logs', (table) => {
        table.increments('id').primary();
        table.string('seed_name').notNullable();
        table.string('created_by').nullable();
        table.json('system_info').nullable();
        table.timestamp('seed_time').defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('seed_logs')
}

