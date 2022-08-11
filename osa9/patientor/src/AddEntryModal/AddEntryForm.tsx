import { Button, Grid, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, SelectField, TypeOption } from "../AddPatientModal/FormField";
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
 
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();
  
	return (
		<Formik
			initialValues={{
				date: "",
				type: "HealthCheck",
				specialist: "",
				diagnosisCodes: [],
				description: "",
				healthCheckRating: 0
			}}
			onSubmit={onSubmit}
			validate={values => {
				const requiredError = "Field is required";
				const errors: {[field: string]: string} = {};
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.specialist) {
					errors.date = requiredError;
				}
				if (!values.description) {
					errors.date = requiredError;
				}
				if (!values.healthCheckRating) {
					errors.discharge = requiredError;
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
					<Field
						label="HealthCheckRating"
						min={0}
						max={4}
						component={NumberField}	
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
								style={{
									float: "right",
								}}
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