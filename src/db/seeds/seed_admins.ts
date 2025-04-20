import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("admins").del();

    // Inserts seed entries
    await knex('admins').insert([
        {
            type: 'Super Admin',
            code: 'SA001',
            firstName: 'Asad',
            lastName: 'Khan',
            phone: '000000000',
            email: 'asad@test.com',
            password: '$2y$10$GcDtaNI73KRyE2oaz644F.PI9/CHZ2eNjPoG4GAMyU9G138bFKA6u', 
            avatar: null,
            pincode: '123456',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            type: 'Super Admin',
            code: 'DLR001',
            firstName: 'Sanjay',
            lastName: 'Yadav',
            phone: '8888888888',
            email: 'sanjay@test.com',
            password: '$2y$10$GcDtaNI73KRyE2oaz644F.PI9/CHZ2eNjPoG4GAMyU9G138bFKA6u',
            avatar: null,
            pincode: '654321',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ]);
};
