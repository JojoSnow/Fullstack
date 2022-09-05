import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import Repository from './Repository';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: '#e1e4e8'
	}
});

const Main = () => {
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<AppBar />
				<Routes>
					<Route path="/" element={<RepositoryList />} exact />
					<Route path="/signIn" element={<SignIn />} exact />
					<Route path="/" element={<Navigate to="/" replace />} />
					<Route path="/:repositoryId" element={<Repository />} />
				</Routes>
			</View>
		</View>
	);
};

export default Main;