export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export interface Discharge {
	date: string;
	criteria: string;
}

export interface SickLeave {
	startDate: string;
	endDate: string;
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry

export interface HealthCheckEntries {
	id: string;
	description: string;
	date: string;
	type: "HealthCheck";
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
	healthCheckRating: number;
}

export interface OccupationalHealthcareEntries {
	id: string;
	description: string;
	date: string;
	type: "OccupationalHealthcare";
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>; 
	employerName: string;
	sickLeave?: SickLeave;
}

export interface HospitalEntries {
	id: string;
	description: string;
	date: string;
	type: "Hospital";
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
	discharge: Discharge;
}

export type NewHealthCheckEntry = Omit<HealthCheckEntries, 'id'>;

export type NewOccupationalHealthcareEntry = 
	Omit<OccupationalHealthcareEntries, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntries, 'id'>;

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface Patients {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
	entries: Entry[];
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export type NonSensitivePatients = Omit<Patients, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patients, 'id'>;

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender | string;
	dateOfBirth: string;
	entries: Entry[];
};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
