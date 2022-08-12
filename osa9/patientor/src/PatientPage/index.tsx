import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, Button } from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WorkIcon from '@material-ui/icons/Work';
import HealingIcon from '@material-ui/icons/Healing';

import { useStateValue, setPatient, addEntry } from "../state";
import { Patient, Entry, HealthCheckEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const HospitalEntry = ({entry}: {entry: Entry}): JSX.Element => (
	<li>
		<LocalHospitalIcon /> {entry.date} 
		<p><i>{entry.description}</i></p>
		<p>Diagnosed by {entry.specialist}</p>
	</li>	
);

const OccupationalHealthcareEntry = ({entry}: {entry: Entry}): JSX.Element => (
	<li>
		<WorkIcon /> {entry.date}
		<p><i>{entry.description}</i></p>
		<p>Diagnosed by {entry.specialist}</p>
	</li>		
);

const HealthCheckEntryy = ({entry}: {entry: Entry}): JSX.Element => (
	<li>
		<HealingIcon /> {entry.date} 
		<p><i>{entry.description}</i></p>
		<p>Diagnosed by {entry.specialist}</p>
	</li>	
);

const EntryDetails = ({entry}: {entry: Entry}): JSX.Element => {
	switch (entry.type) {
		case 'Hospital':
			return <HospitalEntry entry={entry}/>;
		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntry entry={entry} />;
		case 'HealthCheck':
			return <HealthCheckEntryy entry={entry} />;
		default:
			return assertNever(entry);
	}
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const PatientPage = () => {
	const [{ patient }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

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

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const foundPatient = Object.values(patient).find(p => p.id === id);	

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			if (id) {
				const { data: newEntry } = await axios.post<HealthCheckEntry>(
					`${apiBaseUrl}/patients/${id}/entries`,
					values
				);
				dispatch(addEntry(newEntry));
				closeModal();
			}
			
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.error(e?.response?.data || "Unrecognized axios error");
				setError(String(e?.response?.data?.error) || "Unrecognized axios error");
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

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
				{foundPatient?.entries?.map((entry: Entry) => (
					<ul style={{
							listStyleType: 'none', 
							borderColor: 'black', 
							borderStyle: 'solid'
						}} 
						key={entry.id}
					>
						<EntryDetails entry={entry} />
					</ul>
					)
				)}
				<AddEntryModal
					modalOpen={modalOpen}
					onSubmit={submitNewEntry}
					error={error}
					onClose={closeModal}
				/>
				<Button onClick={() => openModal()} variant="contained" color="primary">
					Add Entry
				</Button>
				
			</div>
			
		);
	} else {
		return <p>error occured</p>;
	}
	
};

export default PatientPage;
