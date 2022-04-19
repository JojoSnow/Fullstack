import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import {NonSensitivePatients, NewPatient, Patients, Patient} from '../types';
const newId = uuid();

const getNonSensitivePatients = (): NonSensitivePatients[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
	}));
};

const addPatient = (patient: NewPatient): Patients => {
	const newPatient = {
		id: newId,
		...patient
	};

	patients.push(newPatient);
	return newPatient;
};

const getPatientById = (id: string): Patient => {
	const foundPatient = patients.filter(p => p.id === id);
	return foundPatient[0];
}

export default {
	getNonSensitivePatients,
	addPatient,
	getPatientById
};