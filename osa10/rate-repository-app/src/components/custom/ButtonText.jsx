import { StyleSheet } from 'react-native';

import theme from '../../style/theme';
import Text from './Text';

const styles = StyleSheet.create({
	buttonText: {
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textLight,
		textAlign: 'center',
		fontSize: theme.fontSizes.body
	}
});


const ButtonText = ({ style, ...props }) => {
	const textStyle = [
		styles.buttonText,
		style
	]

	return <Text style={textStyle} {...props} />
};

export default ButtonText;
