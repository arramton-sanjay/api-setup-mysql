import knex, { Knex } from 'knex';
import Config from '../config';

class KnexDB {
	static connectKnex(): Knex {
		global.knexInstance = knex({
			client: Config.database.dialect,
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
			acquireConnectionTimeout: 60 * 1000 * 60,
			debug: false,
		});

		global.knexInstance.on('query', ({ sql, bindings }: { sql: string; bindings: any[] }) => {
			// console.log('[db]', global.knexInstance?.raw(sql, bindings).toQuery());
		});

		return global.knexInstance;
	}
}

export default KnexDB;