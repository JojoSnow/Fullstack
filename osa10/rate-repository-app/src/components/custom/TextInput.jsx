import {TextInput as NativeTextInput, StyleSheet} from 'react-native';

import theme from '../../style/theme';

const styles = StyleSheet.create({
	errorInput: {
		marginHorizontal: 10,
		marginVertical: 7,
		fontSize: theme.fontSizes.body,
		borderColor: theme.colors.error,
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 2,
		paddingHorizontal: 10,
		paddingVertical: 5
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

const TextInput = ({ style, error, ...props }) => {
	if (!error) {
		return (
			<NativeTextInput style={styles.input} placeholderTextColor={theme.colors.bgLight} {...props} />
		);
	} else {
		return (
			<NativeTextInput style={styles.errorInput} placeholderTextColor={theme.colors.bgLight} {...props} />
		)		
	}
};

export default TextInput;