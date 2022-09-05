import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './custom/Button';
import ButtonText from './custom/ButtonText';
import FormikTextInput from './custom/FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
	form: {
		backgroundColor: 'white',
		paddingVertical: 5
	}
});

const initialValues = {
	username: '',
	password: ''
};

const validationSchema = Yup.object().shape({
	username: Yup
		.string()
		.required('Username is required'),
	password: Yup
		.string()
		.required('Password is required')
})

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
			<Pressable onPress={onSubmit}>
				<Button>
					<ButtonText>Sign In</ButtonText>
				</Button>
			</Pressable>
		</View>
	);
};

export const SignInContainer = ({ onSubmit }) => {
	return (
		<Formik 
			initialValues={ initialValues } 
			onSubmit={ onSubmit }
			validationSchema={ validationSchema }
		>
			{({ handleSubmit }) => <SignInForm onSubmit={ handleSubmit }/>}
		</Formik>
	);
}

const SignIn = () => {
	const [ signIn ] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });
			if ( data.authenticate.accessToken ) {
				navigate('../', { replace: true })
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<SignInContainer onSubmit={ onSubmit } />
	);
};

export default SignIn;