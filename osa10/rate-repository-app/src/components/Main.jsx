import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import SingleRepository from './SingleRepository';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Review from './Review';

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
					<Route path="/signUp" element={<SignUp />} exact />
					<Route path="/" element={<Navigate to="/" replace />} />
					<Route path="/:id" element={<SingleRepository />} />
					<Route path="/review/:id" element={<SingleRepository />} />
					<Route path="/review" element={<Review />} />
				</Routes>
			</View>
		</View>
	);
};

export default Main;