import patients from '../../data/patients';

import {NonSensitivePatients} from '../types';

const getNonSensitivePatients = (): NonSensitivePatients[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

export default {
	getNonSensitivePatients
};