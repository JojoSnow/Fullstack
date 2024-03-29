import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import theme from '../../style/theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
	errorText: {
		color: theme.colors.error,
		marginLeft: 10,
		marginBottom: 5
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
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;