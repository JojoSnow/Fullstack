import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, SelectField, TextField, TypeOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HealthCheckEntry, Type } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

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
	
	return (
		<Formik
			initialValues={{
				date: "",
				type: Type.HealthCheck,
				specialist: "",
				diagnosisCodes: [],
				description: "",
				healthCheckRating: 0
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				console.log(values);
				const requiredError = "Field is required";
				const errors: {[field: string]: string} = {};
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.healthCheckRating) {
					errors.healthCheckRating = requiredError;
				}
				return errors;
			}}
		>	
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<SelectField label="Type" name="type" options={typeOptions} />
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
						<Field
							label="HealthCheckRating"
							name="healthCheckRating"
							min={0}
							max={4}
							component={NumberField}	
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>    					
						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: "left" }}
									type="button"
									onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{ float: "right" }}
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