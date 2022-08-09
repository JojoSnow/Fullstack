import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { Typography, List, ListItem } from '@material-ui/core';

import { useStateValue, setPatient, setDiagnoses } from "../state";
import { Patient, DiagnoseList, Diagnose, Entry } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage = () => {
	const [{ patient, diagnoses }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();

	React.useEffect(() => {	
		const fetchPatient = async () => {
			try {
				if (id) {
					const { data: thisPatient } = await axios.get<Patient>(
						`${apiBaseUrl}/patients/${id}`
					);
					dispatch(setPatient(thisPatient));
				}
			} catch (e) {
				console.error(e);
			}
		};
		const fetchDiagnoses = async () => {
			try {
				const { data: diagnose } = await axios.
				get<DiagnoseList>(
					`${apiBaseUrl}/diagnoses`
				);
				dispatch(setDiagnoses(diagnose));
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatient();
		void fetchDiagnoses();
	}, [dispatch]);

	const foundPatient = Object.values(patient).find(p => p.id === id);	

	if (foundPatient) {
		return (
			<div>
				<Typography align="left" variant="h4" style={{ marginTop: "1em"}}>{foundPatient.name} </Typography>
				<List>
					<ListItem>Gender: {foundPatient.gender}</ListItem>
					<ListItem>Ssn: {foundPatient.ssn}</ListItem>
					<ListItem>Occupation: {foundPatient.occupation}</ListItem>
				</List>
				<Typography align="left" variant="h6">Entries</Typography>
				{foundPatient?.entries.map((entry: Entry) => (
					<>
						<p>{entry.date}</p> <i>{entry.description}</i>
						<ul>
							{entry.diagnosisCodes ? 
								entry.diagnosisCodes.map((code: string) => (
									Object.values(diagnoses).map((diag: Diagnose) => {
										if (diag.code === code) {
											return (
												<li key={code}>{diag.code} {diag.name}</li>
											);
										}
									})
								)) : 
								''
							}
						</ul>
					</>
					)
				)}
				
			</div>
			
		);
	} else {
		return <p>error occured</p>;
	}
	
};

export default PatientPage;