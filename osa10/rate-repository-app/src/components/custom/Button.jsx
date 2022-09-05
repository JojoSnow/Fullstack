import { View, StyleSheet } from 'react-native';

import theme from '../../style/theme';

const styles = StyleSheet.create({
	button: {
		backgroundColor: theme.colors.primary,
		margin: 10,
		paddingVertical: 10,
		borderRadius: 2
	}
});

const Button = ({ style, ...props }) => {
	const buttonStyle = [
		styles.button,
		style
	]

	return <View style={buttonStyle} {...props} />;
};

export default Button;