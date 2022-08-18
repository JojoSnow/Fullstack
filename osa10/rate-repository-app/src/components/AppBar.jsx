import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../style/theme';
import Text from './Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
	heading: {
		margin: 15,
		color: theme.colors.textLight,
		fontWeight: theme.fontWeights.bold
	}
});

const AppBar = () => {
	
	return (
		<Pressable>
			<AppBarTab>
				<ScrollView horizontal={true}>
					<Link to="/" >	
						<Text style={styles.heading}>Repositories</Text>
					</Link>
					<Link to="/signIn" >	
						<Text style={styles.heading}>Sign In</Text>
					</Link>
				</ScrollView>
				
			</AppBarTab>
		</Pressable>
	);
};

export default AppBar;