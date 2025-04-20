import { Knex } from 'knex';
import Config from './src/config'; 
import path from 'path'
const knexConfig: Knex.Config = {
  client: 'mysql2', 
  connection: {
    host: Config.database.host,
    user: Config.database.user,
    password: Config.database.password,
    database: Config.database.name,
  },
  pool: {
    min: 0,
    max: 50,
  },
  migrations: {
    directory: path.join(__dirname, '/src/db/migrations'),
  },
  seeds: {
    directory:  path.join(__dirname, '/src/db/seeds'),
  },
  debug: true,
};

export default knexConfig;
