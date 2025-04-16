import express, { Express } from 'express';
import { Server } from 'http';
import path from 'path';
import initLoader from './loaders/index';
import knex, { Knex } from 'knex';

declare global {
	var appRoot: string;
	var knexInstance: Knex;
}

global.appRoot = path.resolve(__dirname);


process.on('uncaughtException', (error: Error) => {
	console.log(error.message);
});

(async () => {
	try {
		const app: Express = express();
		app.use(express.static(path.join(__dirname, '..', 'public')));

		const server: Server = app.listen(4000, (err?: Error) => {
			if (err) {
				process.exit(1);
				return;
			}
			console.log('Server started on port 4000');
		});

		await initLoader({ expressApp: app, server });
	} catch (e) {
		console.log(e);
	}
})();
