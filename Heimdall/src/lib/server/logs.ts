import { db } from './db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export interface LogEntry {
	id: string;
	userId: string;
	userName?: string;
	action: string;
	details: string;
	timestamp: Date;
}

interface GenerateLogData {
	userId: string;
	action: string;
	details: string;
	timestamp?: Date;
}

export const generateLog = async (data: GenerateLogData): Promise<LogEntry | null> => {
	try {
		const id = crypto.randomUUID();
		const log = {
			id,
			userId: data.userId,
			action: data.action,
			details: data.details,
			timestamp: data.timestamp || new Date()
		};

		await db.insert(table.logs).values(log);

		return log;
	} catch (error) {
		console.error('Error generating log:', error);
		return null;
	}
};

export const getPastLogs = async (limit?: number): Promise<LogEntry[]> => {
	try {
		const defaultLimit = 20;
		limit = limit || defaultLimit;
		const response = await db
			.select()
			.from(table.logs)
			.innerJoin(table.user, eq(table.logs.userId, table.user.id))
			.orderBy(table.logs.timestamp)
			.limit(limit);

		return response.map((row) => ({
			id: row.logs.id,
			userId: row.logs.userId,
			userName: row.user.username,
			action: row.logs.action,
			details: row.logs.details,
			timestamp: new Date(row.logs.timestamp)
		})) as LogEntry[];
	} catch (error) {
		console.error('Error fetching logs:', error);
		return [];
	}
};
