import { NewHospitalEntry } from "./types";

type Fields = {date: unknown, specialist: unknown, type: unknown, description: unknown, diagnosisCodes: unknown, discharge: unknown}

const toNewHospitalEntry = ({date, specialist, description, diagnosisCodes, discharge}: Fields): NewHospitalEntry => {
	const newEntry: NewHospitalEntry = {
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		type: "Hospital",
		description: parseDesc(description),
		diagnosisCodes: parseDiagCodes(diagnosisCodes),
		discharge: parseDischarge(discharge)
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

const parseDischarge = (discharge: any) => {
	if (!discharge) {
		throw new Error('Incorrect or missing discharge info');
	}
	return discharge;
};

export default toNewHospitalEntry;