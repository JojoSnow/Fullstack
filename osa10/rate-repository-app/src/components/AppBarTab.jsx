import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../style/theme';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.secondary
	}
});

const AppBarTab = ({ style, ...props }) => {
	const barTabStyle = [
		styles.container,
		style
	];

	return <View style={barTabStyle} {...props} />;
};

export default AppBarTab;