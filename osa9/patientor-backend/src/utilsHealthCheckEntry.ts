import { NewHealthCheckEntry } from './types';

type Fields = {date: unknown, specialist: unknown, type: unknown, description: unknown, healthCheckRating: unknown, diagnosisCodes: unknown}

const toNewHealthCheckEntry = ({date, specialist, description, healthCheckRating, diagnosisCodes}: Fields): NewHealthCheckEntry => {
	const newEntry: NewHealthCheckEntry = {
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		type: "HealthCheck",
		description: parseDesc(description),
		healthCheckRating: parseHCR(healthCheckRating),
		diagnosisCodes: parseDiagCodes(diagnosisCodes)
	}
	return newEntry;
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
	return typeof num === 'number' || num instanceof Number;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date)) {
		throw new Error('Incorrect or missing date');
	}
	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

const parseDesc = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};

const parseHCR = (healthCheckRating: unknown): number => {
	if (!healthCheckRating || !isNumber(healthCheckRating)) {
		throw new Error('Incorrect or missing healthCheckRating');
	}
	return healthCheckRating;
};

const parseDiagCodes = (diagnosisCodes: any): string[] => {
	return diagnosisCodes;
};

export default toNewHealthCheckEntry;