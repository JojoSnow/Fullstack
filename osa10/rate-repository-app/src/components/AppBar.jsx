import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../style/theme';
import Text from './Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
	heading: {
		paddingLeft: 10,
		paddingTop: 10,
		color: theme.colors.textLight,
		fontWeight: theme.fontWeights.bold
	},
	barTabList: {
		display: 'flex',
		flexDirection: 'row',
		paddingLeft: 15,
		paddingBottom: 15,
		justifyContent: 'flex-start'
	}
});

const AppBar = () => {
	
	return (
		<Pressable>
			<AppBarTab style={styles.barTabList}>
				<Link to="/" >	
					<Text style={styles.heading}>Repositories</Text>
				</Link>
				<Link to="/signIn" >	
					<Text style={styles.heading}>Sign In</Text>
				</Link>
			</AppBarTab>
		</Pressable>
	);
};

export default AppBar;