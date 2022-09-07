import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './custom/Button';
import ButtonText from './custom/ButtonText';
import FormikTextInput from './custom/FormikTextInput';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
	form: {
		backgroundColor: 'white',
		paddingVertical: 5
	}
});

const initialValues = {
	username: '',
	password: '',
	passwordConfirm: ''
};

const validationSchema = Yup.object().shape({
	username: Yup
		.string()
		.min(1)
		.max(30)
		.required('Username is required'),
	password: Yup
		.string()
		.min(5)
		.max(50)
		.required('Password is required'),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], 'Passwords do not match')
		.required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
			<FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry={true} />
			<Pressable onPress={onSubmit}>
				<Button>
					<ButtonText>Sign Up</ButtonText>
				</Button>
			</Pressable>
		</View>
	);
};

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik 
			initialValues={ initialValues } 
			onSubmit={ onSubmit }
			validationSchema={ validationSchema }
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={ handleSubmit }/>}
		</Formik>
	);
};

const SignUp = () => {
	const [ signUp ] = useCreateUser();
	const [ signIn ] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signUp({ username, password });
			
			if ( data ) {
				const { data } = await signIn({ username, password });
				if ( data.authenticate.accessToken ) {
					navigate('../', { replace: true });
				}
			}
			
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<SignUpContainer onSubmit={ onSubmit } />
	);
};

export default SignUp;