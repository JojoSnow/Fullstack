import Constants from 'expo-constants';
import {StyleSheet, View} from 'react-native';

import RepositoryList from './Repository';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1
	}
});

const Main = () => {
	return (
		<View style={styles.container}>
			<Text>Simple Text</Text>
			<RepositoryList />
		</View>
	);
};

export default Main;