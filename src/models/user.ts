import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('admins', (table) => {
        table
            .increments('id')
            .primary();
        table
            .enum('type', ['Super Admin', 'Sub Admin', 'Dealer'])
            .notNullable();
        table.integer('countryId').unsigned().nullable();
        table.integer('stateId').unsigned().nullable();
        table.integer('cityId').unsigned().nullable();
        table.string('code', 20).nullable();
        table.string('firstName', 255).notNullable();
        table.string('lastName', 255).notNullable();
        table.string('phone', 255).nullable();
        table.string('email', 255).nullable();
        table.string('password', 255).nullable();
        table.string('avatar', 255).nullable();
        table.string('pincode', 255).nullable();
        table.boolean('status').nullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('deletedAt').nullable();

        table.index(['countryId'], 'countryId');
        table.index(['stateId'], 'stateId');
        table.index(['cityId'], 'cityId');

        table
            .foreign('countryId')
            .references('id')
            .inTable('countries')
            .onDelete('SET NULL')
            .onUpdate('CASCADE');

        table
            .foreign('stateId')
            .references('id')
            .inTable('states')
            .onDelete('SET NULL')
            .onUpdate('CASCADE');
    
        table
            .foreign('cityId')
            .references('id')
            .inTable('cities')
            .onDelete('SET NULL')
            .onUpdate('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('admins');
}