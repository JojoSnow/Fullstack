import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import toNewHealthCheckEntry from '../utilsHealthCheckEntry';
import toNewOccupationalHealthcareEntry from '../utilsOccupationalHealthcareEntry';
import toNewHospitalEntry from '../utilsHospitalEntry';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const patient = patientService.getPatientById(id);
	res.send(patient);
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);

		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMsg = 'Something went wrong.';
		if (error instanceof Error) {
			errorMsg += ' Error: ' + error.message;
		}
		res.status(400).send(errorMsg);
	}
});

router.get('/:id/entries', (req, res) => {
	const id = req.params.id;
	const entries = patientService.getPatientEntries(id);
	res.send(entries);
});

router.post('/:id/', (req, res) => {
	const id = req.params.id;
	
	try {
		
		if (req.body.type === 'HealthCheck') {
			const newEntry = toNewHealthCheckEntry(req.body);
			const addedHealthCheckEntry = patientService.addHealthCheckEntry(newEntry, id);
			console.log(newEntry);
			res.json(addedHealthCheckEntry);
		} 
		if (req.body.type === 'OccupationalHealthcare') {
			const newEntry = toNewOccupationalHealthcareEntry(req.body);
			const addedOccupationalHealthcareEntry = patientService.addOccupationalHealthcareEntry(newEntry, id);
			res.json(addedOccupationalHealthcareEntry);
		}
		if (req.body.type === 'Hospital') {
			const newEntry = toNewHospitalEntry(req.body);
			const addedHospitalEntry = patientService.addHospitalEntry(newEntry, id);
			res.json(addedHospitalEntry);
		}

		
	} catch (error: unknown) {
		let errorMsg = 'Something went wrong.';
		if (error instanceof Error) {
			errorMsg += ' Error: ' + error.message;
		}
		res.status(400).send(errorMsg);
	}
});

export default router;