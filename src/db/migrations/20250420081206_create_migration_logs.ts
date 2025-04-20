import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('migration_logs', (table)=>{
        table.increments('id').primary(),
        table.string('migration_name'),
        table.string('created_by'),
        table.string('system_info'),
        table.timestamp('migration_time').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('migration_logs')
}

