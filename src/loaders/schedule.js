const Logger = require('../utilities/Logger');
const { TempFileDir } = require('../config');

class Schedule {
	static async init() {
		Schedule.deleteTempFiles();
	}

	/**
	 * @description deletes old temporary files older than 10 hours every hour
	 */
	static deleteTempFiles() {
		setInterval(() => {
			// Logger.info('Deleting temporary files', { TempFileDir });


			// Logger.info(`Deleted temporary files: ${Object.values(result).length}`);
		}, 3600000);
	}
}

module.exports = Schedule;
