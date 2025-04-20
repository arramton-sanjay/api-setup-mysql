import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('persons', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('email').unique().notNullable(); // Unique email
    table.string('name').notNullable(); // Non-nullable name
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp with default
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('persons');
}