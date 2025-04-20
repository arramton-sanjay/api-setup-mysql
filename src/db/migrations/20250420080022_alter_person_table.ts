import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('persons', (table) => {
        table.integer('age').nullable(); 
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('persons', (table) => {
        table.dropColumn('age');
      });
}

