import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

import FormikNumberInput from './custom/FormikNumberInput';
import FormikTextInput from './custom/FormikTextInput';
import Button from './custom/Button';
import ButtonText from './custom/ButtonText';

const styles = StyleSheet.create({
	form: {
		backgroundColor: 'white',
		paddingVertical: 5
	}
});

const initialValues = {
	repositoryName: '',
	ownerName: '',
	rating: 0,
	text: ''
};

const validationSchema = Yup.object().shape({
	ownerName: Yup
		.string()
		.required('Repository owner name is required'),
	repositoryName: Yup
		.string()
		.required('Repository name is required'),
	rating: Yup
		.number('Rating has to be a number')
		.min(0)
		.max(100)
		.required('Rating is required'),
	text: Yup
		.string()
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput name="ownerName" placeholder="Repository owner name" />
			<FormikTextInput name="repositoryName" placeholder="Repository name" />
			<FormikNumberInput name="rating" placeholder="Rating between 0 and 100" />
			<FormikTextInput name="text" placeholder="Review" multiline={true} />
			<Pressable onPress={onSubmit}>
				<Button>
					<ButtonText>Create a Review</ButtonText>
				</Button>
			</Pressable>
		</View>
	);
};

export const ReviewContainer = ({ onSubmit }) => {
	return (
		<Formik 
			initialValues={ initialValues } 
			onSubmit={ onSubmit }
			validationSchema={ validationSchema }
		>
			{({ handleSubmit }) => <SignInForm onSubmit={ handleSubmit }/>}
		</Formik>
	);
};

const Review = () => {
	const [ createReview ] = useCreateReview();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { repositoryName, ownerName, rating, text } = values;
		
		try {
			const { data } = await createReview({ repositoryName, ownerName, rating, text });
			navigate(`${data.createReview.repositoryId}`, { replace: true })
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<ReviewContainer onSubmit={onSubmit} />
	);
};

export default Review;