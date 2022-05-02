import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { Typography, List, ListItem } from '@material-ui/core';

import { useStateValue, setPatient } from "../state";
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
 
const PatientPage = () => {
	const [{ patient }, dispatch] = useStateValue();
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
		void fetchPatient();
	}, [dispatch]);

	const foundPatient = Object.values(patient).find(p => p.id === id);

	if (foundPatient) {
		return (
			<div>
				<Typography align="left" variant="h5" style={{ marginTop: "1em"}}>{foundPatient.name} </Typography>
				<List>
					<ListItem>Gender: {foundPatient.gender}</ListItem>
					<ListItem>Ssn: {foundPatient.ssn}</ListItem>
					<ListItem>Occupation: {foundPatient.occupation}</ListItem>
				</List>
				
			</div>
			
		);
	} else {
		return <p>error occured</p>;
	}
	
};

export default PatientPage;