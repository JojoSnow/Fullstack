import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import {NonSensitivePatients, NewPatient, Patients, Patient, Entry,  NewHealthCheckEntry, HealthCheckEntries, NewOccupationalHealthcareEntry, OccupationalHealthcareEntries, NewHospitalEntry, HospitalEntries} from '../types';
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
};

const getPatientEntries = (id: string): Entry[] => {
	const patient = getPatientById(id);
	return patient.entries;
};

const addHealthCheckEntry = (entry: NewHealthCheckEntry, id: string): HealthCheckEntries => {
	const entries = getPatientEntries(id);

	const newEntry = {
		id: newId,
		...entry
	}
	entries.push(newEntry);
	return newEntry;
}

const addOccupationalHealthcareEntry = (entry: NewOccupationalHealthcareEntry, id: string): OccupationalHealthcareEntries => {
	const entries = getPatientEntries(id);

	const newEntry = {
		id: newId,
		...entry
	}
	entries.push(newEntry);
	return newEntry;
}

const addHospitalEntry = (entry: NewHospitalEntry, id: string): HospitalEntries => {
	const entries = getPatientEntries(id);

	const newEntry = {
		id: newId,
		...entry
	}
	entries.push(newEntry);
	return newEntry;
}

export default {
	getNonSensitivePatients,
	addPatient,
	getPatientById,
	getPatientEntries,
	addHealthCheckEntry,
	addOccupationalHealthcareEntry,
	addHospitalEntry
};