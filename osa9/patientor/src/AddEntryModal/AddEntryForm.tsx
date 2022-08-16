import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, SelectField, TextField, TypeOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry, Type } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const typeOptions: TypeOption[] = [
	{ value: Type.Hospital, label: "Hospital" },
	{ value: Type.HealthCheck, label: "HealthCheck" },
	{ value: Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
];
 
export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

	const additionalFields = (type: Type) => {
		switch (type) {
			case "HealthCheck":
				return (
					<Field
						label="HealthCheckRating"
						name="healthCheckRating"
						min={0}
						max={4}
						component={NumberField}	
					/>
				);
			case "Hospital":
				return (
					<>
					<Field
						label="Discharge Date"
						placeholder="YYYY-MM-DD"
						name="discharge.date"
						component={TextField}
					/>
					<Field
						label="Discharge Criteria"
						placeholder="Discharge Criteria"
						name="discharge.criteria"
						component={TextField}
					/>
					</>
				);
			case "OccupationalHealthcare":
				return (
					<>
					<Field
						label="Employer"
						placeholder="Employer Name"
						name="employer"
						component={TextField}
					/>
					<Field
						label="Sick Leave Start Day"
						placeholder="YYYY-MM-DD"
						name="sickLeave.startDate"
						component={TextField}
					/>
					<Field
						label="Sick Leave End Date"
						placeholder="YYYY-MM-DD"
						name="sickLeave.endDate"
						component={TextField}
					/>
					</>
				);
			default:
				break;
		}
	};
	
	return (
		<Formik
			initialValues={{
				date: "",
				type: Type.HealthCheck,
				specialist: "",
				diagnosisCodes: [],
				description: "",
				healthCheckRating: 0,
				employer: "",
				sickLeave: {
				startDate: "",
				endDate: "",
				},
				discharge: {
				date: "",
				criteria: "",
				},
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const formatError = "Field is in wrong format";
				const errors: {[field: string]: string} = {};

				if (!values.date) {
					errors.date = requiredError;
				}
				if (!/^\d{4}-[0-1]{1}\d{1}-[0-3]{1}\d{1}$/.test(values.date)) {
					errors.date = formatError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (values.type === Type.HealthCheck) {
					if (!values.healthCheckRating) {
					errors.healthCheckRating = requiredError;
					}
					if (!values.healthCheckRating) {
					errors.healthCheckRating = requiredError;
					}
					}
				if (values.type === Type.Hospital) {
					if (!values.discharge.criteria || !values.discharge.date) {
						errors.discharge = requiredError;
					}
					}
				if (values.type === Type.OccupationalHealthcare) {
					if (!values.employer) {
						errors.employer = requiredError;
					}
				}
				return errors;
			}}
		>	
			{({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
				console.log(values);
				return (
					<Form className="form ui">
						<SelectField label="Type" name="type" options={typeOptions} />
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>
						<Field
							fullWidth
							label="Description"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>
						{additionalFields(values.type)}    					
						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: "left", marginTop: "1em" }}
									type="button"
									onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{ float: "right", marginTop: "1em" }}
									type="submit"
									variant="contained"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;