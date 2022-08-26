import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import theme from '../style/theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
	form: {
		backgroundColor: 'white',
		paddingVertical: 5
	},
	submitBtn: {
		backgroundColor: theme.colors.primary,
		margin: 10,
		paddingVertical: 10,
		borderRadius: 2
	},
	submitBtnText: {
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textLight,
		textAlign: 'center'
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
				<View style={styles.submitBtn}>
					<Text style={styles.submitBtnText}>Sign In</Text>
				</View>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });
			console.log(data);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Formik 
			initialValues={initialValues} 
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
		</Formik>
	);
};

export default SignIn;