import { NewOccupationalHealthcareEntry } from "./types";

type Fields = {date: unknown, specialist: unknown, type: unknown, description: unknown, employerName: unknown, diagnosisCodes: unknown, sickLeave: unknown}

const toNewOccupationalHealthcareEntry = ({date, specialist, description, diagnosisCodes, employerName, sickLeave}: Fields): NewOccupationalHealthcareEntry => {
	const newEntry: NewOccupationalHealthcareEntry = {
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		type: "OccupationalHealthcare",
		description: parseDesc(description),
		diagnosisCodes: parseDiagCodes(diagnosisCodes),
		employerName: parseEmployer(employerName),
		sickLeave: parseSickLeave(sickLeave)
	}
	return newEntry;
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown) => {
	if (!date || !isString(date)) {
		throw new Error('Incorrect or missing date');
	}
	return date;
};

const parseSpecialist = (specialist: unknown) => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

const parseDesc = (description: unknown) => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};

const parseDiagCodes = (diagnosisCodes: any) => {
	return diagnosisCodes;
};

const parseEmployer = (employerName: unknown) => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing employer name');
	}
	return employerName;
};

const parseSickLeave = (sickLeave: any) => {
	return sickLeave;
};

export default toNewOccupationalHealthcareEntry;