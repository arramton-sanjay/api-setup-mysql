import { Express } from 'express';
import knex from './knex';

import expressLoader from './express';
// import schedule from './schedule';
// import Logger from '../utilities/Logger';
// import mongoose from './mongoose';
// import socketLoader from './socketio';

// import './lodash';

interface LoaderParams {
	expressApp: Express; // Replace `any` with the actual type of your Express app if available
	server: any; // Replace `any` with the actual type of your server if available
}

const loader = async function ({ expressApp, server }: LoaderParams): Promise<void> {
	// await mongoose();
	// Logger.info('✌️ DB loaded and connected!');

	await knex.connectKnex();
	console.log('✌️ Knex loaded and connected!');
	// await schedule.init();
	// Logger.info('✌️ Scheduler Running');

	await expressLoader({ app: expressApp });
	// Logger.info('✌️ Express loaded');

	// global.io = await socketLoader({ server });
	// Logger.info('✌️ Socket loaded');
};

export default loader;