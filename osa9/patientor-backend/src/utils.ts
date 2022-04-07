import {NewPatient} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
	const newPatient: NewPatient = {
		name: object.name,
		dateOfBirth: object.dateOfBirth,
		ssn: object.ssn,
		gender: object.gender,
		occupation: object.occupation
	}

	return newPatient;
};

export default toNewPatient;