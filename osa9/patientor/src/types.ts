export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum Type {
	Hospital = "Hospital",
	HealthCheck = "HealthCheck",
	OccupationalHealthcare = "OccupationalHealthcare"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface PatientList {
  id: string;
  patient: Patient
}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface DiagnoseList {
	id: string;
	diagnose: Diagnose
}

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

export interface HealthCheckEntry extends BaseEntry {
	type: Type.HealthCheck;
	healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
	type: Type.Hospital;
	discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: Type.OccupationalHealthcare;
	employerName: string;
	sickLeave?: SickLeave;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;