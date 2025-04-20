import knex, { Knex } from 'knex';
import config from '../config';
import path from 'path';

class KnexDB {
  private static instance: Knex | undefined;

  static connect(): Knex {
    if (!KnexDB.instance) {
      KnexDB.instance = knex({
        client: config.database.dialect,
        connection: {
          host: config.database.host,
          user: config.database.user,
          password: config.database.password,
          database: config.database.name,
        },
        pool: {
          min: 0,
          max: 50,
        },
        migrations: {
          directory: path.resolve(__dirname, '../db/migrations'),
          tableName: 'knex_migrations',
        },
        seeds: {
          directory: path.resolve(__dirname, '../db/seeds'),
        },
        acquireConnectionTimeout: 60 * 1000 * 60,
        debug: false,
      });

      KnexDB.instance.on('query', ({ sql, bindings }) => {
        // console.log('[db]', KnexDB.instance?.raw(sql, bindings).toQuery());
      });
    }
    return KnexDB.instance;
  }

  static async disconnect(): Promise<void> {
    if (KnexDB.instance) {
      await KnexDB.instance.destroy();
		KnexDB.instance = undefined;
    }
    return Promise.resolve();
  }
}

export default KnexDB;