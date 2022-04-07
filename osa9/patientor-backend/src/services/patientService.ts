import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import {NonSensitivePatients, NewPatient, Patients} from '../types';
const newId = uuid();

const getNonSensitivePatients = (): NonSensitivePatients[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (patient: NewPatient): Patients => {
	const newPatient = {
		id: newId,
		...patient
	};

	patients.push(newPatient);
	return newPatient;
}

export default {
	getNonSensitivePatients,
	addPatient
};