import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import theme from '../style/theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5
	},
	input: {
		marginHorizontal: 10,
		marginVertical: 7,
		fontSize: theme.fontSizes.body,
		borderColor: theme.colors.bgLight,
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 2,
		paddingHorizontal: 10,
		paddingVertical: 5
	}
});

const FormikTextInput = ({ name, placeholder, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<>
			<TextInput
				onChangeText={value => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				style={styles.input}
				placeholder={placeholder}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.Error}</Text>}
		</>
	);
};

export default FormikTextInput;