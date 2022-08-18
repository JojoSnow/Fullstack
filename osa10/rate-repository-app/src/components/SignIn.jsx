import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import theme from '../style/theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

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
	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
		</Formik>
	);
};

export default SignIn;