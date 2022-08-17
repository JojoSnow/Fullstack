import { StyleSheet, Pressable } from 'react-native';

import theme from '../style/theme';
import Text from './Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
	heading: {
		padding: 15,
		color: theme.colors.textLight,
		fontWeight: theme.fontWeights.bold
	}
});

const AppBar = () => {
	
	return (
		<Pressable>
			<AppBarTab>
				<Text style={styles.heading}>Repositories</Text>
			</AppBarTab>
		</Pressable>
	);
};

export default AppBar;