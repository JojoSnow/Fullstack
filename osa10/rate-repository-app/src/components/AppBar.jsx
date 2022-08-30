import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';

import theme from '../style/theme';
import Text from './Text';
import AppBarTab from './AppBarTab';
import useSignOut from '../hooks/useSignOut';

import { USER } from '../graphql/queries';

const styles = StyleSheet.create({
	heading: {
		margin: 15,
		color: theme.colors.textLight,
		fontWeight: theme.fontWeights.bold
	}
});

const AppBar = () => {
	const user = useQuery(USER);
	const signOut = useSignOut();

	const onPress = () => {
		try {
			signOut();
		} catch (e) {
			console.error(e);
		}
	};
	
	return (
		<Pressable>
			<AppBarTab>
				<ScrollView horizontal={true}>
					<Link to="/" >	
						<Text style={styles.heading}>Repositories</Text>
					</Link>
					{user.data.me ? 
					<Link to="/" onPress={onPress}>	
						<Text style={styles.heading}>Sign Out</Text>
					</Link> :
					<Link to="/signIn">	
						<Text style={styles.heading}>Sign In</Text>
					</Link>
					}
					
					
				</ScrollView>
				
			</AppBarTab>
		</Pressable>
	);
};

export default AppBar;