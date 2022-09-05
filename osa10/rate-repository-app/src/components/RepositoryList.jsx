import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import Text from './custom/Text';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ data, loading, navigate }) => {
	let repositoryNodes;

	if (data) {
		repositoryNodes = data.repositories
		? data.repositories.edges.map(edge => edge.node)
		: [];
	}
	return (
		<View>
			{loading || !data ?
				<Text>Fetching data ...</Text>
				:
				<FlatList
					data={repositoryNodes}
					ItemSeparatorComponent={ItemSeparator}
					renderItem={({item}) => (
						<View>
							<Pressable onPress={() => (
								navigate('../repository', { replace: true })
							)}>
								<RepositoryItem item={item} />
							</Pressable>
						</View>
					)}
				/>
			}
		</View>
	);
	
};

const RepositoryList = () => {
	const { data, loading } = useRepositories();
	const navigate = useNavigate();

	return <RepositoryListContainer data={ data } loading={ loading } navigate={ navigate } />;
};

export default RepositoryList;