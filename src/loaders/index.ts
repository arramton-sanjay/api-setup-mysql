import { Express } from 'express';
import knex from './knex';
import expressLoader from './express';
import Logger from '../lib/Logger'

interface LoaderParams {
	expressApp: Express; 
	server: any; 
}

const loader = async function ({ expressApp, server }: LoaderParams): Promise<void> {

	await knex.connectKnex();
	Logger.info('🟡 Knex Loaded Successfully !!');
	console.log('✌️ Knex loaded and connected!');

	await expressLoader({ app: expressApp });
	Logger.info('🟡 Express App initialsed !!');
};

export default loader;