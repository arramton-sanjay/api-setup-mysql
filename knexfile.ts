import type { Knex } from "knex";

const dbConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "your_db_user",
      password: "your_db_password",
      database: "your_db_name",
    },
    migrations: {
      directory: "./src/db/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/db/seeds",
      extension: "ts",
    },
  },
};

export default dbConfig;
