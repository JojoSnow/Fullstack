import { StyleSheet, Text as NativeText } from 'react-native';

import theme from '../../style/theme';

const styles = StyleSheet.create({
	subHeading: {
		fontFamily: theme.fonts.main,
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold
	}
});

const SubHeading = ({ style, ...props }) => {
	const subHeading = [
		styles.subHeading,
		style
	];

	return <NativeText style={subHeading} {...props} />;
};

export default SubHeading;