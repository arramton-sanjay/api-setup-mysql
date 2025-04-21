import os from 'os';

import { execSync } from 'child_process';

function getGitUsername(): string {
	try {
		return execSync('git config user.name').toString().trim();
	} catch (err) {
		return process.env.USER || process.env.USERNAME || 'unknown';
	}
}
// Function to get user and system info
export function getMigrationMetadata() {
	return {
		created_by: getGitUsername(),
		system_info: `${os.hostname()} (${os.platform()})`,
	};
}


export function clearSearch(obj: Record<string, any>) {
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === "object") {
			clearSearch(value);
		} else {
			if (typeof value === 'undefined' || (typeof value === 'string' && value.length < 1)) {
				delete (obj[key]);
			}
		}
	}
}