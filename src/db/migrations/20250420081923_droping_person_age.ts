import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasColumn('persons', 'age');
  if (exists) {
    await knex.schema.alterTable('persons', (table) => {
      table.dropColumn('age');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasColumn('persons', 'age');
  if (!exists) {
    await knex.schema.alterTable('persons', (table) => {
      table.integer('age');
    });
  }
}
