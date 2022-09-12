import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

import theme from '../style/theme';
import Text from './custom/Text';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	menu: {
		marginVertical: 5,
		marginHorizontal: 10
	},
	menuItem: {
		color: theme.colors.textSecondary
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = (props) => {

	const latestRepos = {
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC'
	};
	const highestRepos = {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'DESC'
	};
	const lowestRepos = {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'ASC'
	};

	const handleChange = (index) => {
		switch (index) {
			case 1:
				props.setOrder(latestRepos);
				break;
			case 2:
				props.setOrder(highestRepos);
				break;
			case 3:
				props.setOrder(lowestRepos);
				break;
			default:
				break;
		} 
	};

	return (
		<Picker
			selectedValue={props.order}
			onValueChange={(_itemValue, itemIndex) => handleChange(itemIndex)}
			style={styles.menu}
		>
			<Picker.Item label="Select an item..." enabled={false} style={styles.menuItem} />
			<Picker.Item label="Latest Repositories" />
			<Picker.Item label="Highest Rated Repositories" />
			<Picker.Item label="Lowest Rated Repositories" />
		</Picker>
	);
};

export const RepositoryListContainer = ({ data, loading, navigate, order, setOrder }) => {
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
					ListHeaderComponent={<RepositoryListHeader order={order} setOrder={setOrder} />}
					renderItem={({item}) => (
						<View>
							<Pressable onPress={() => {
								const id = item.id;
								navigate(`${id}`, { replace: true })
							}}>
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
	const [order, setOrder] = useState({
		orderBy: 'CREATED_AT', 
		orderDirection: 'DESC'
	});
	const { data, loading } = useRepositories(order);
	const navigate = useNavigate();

	return <RepositoryListContainer data={data} loading={loading} navigate={navigate} order={order} setOrder={setOrder} />;
};

export default RepositoryList;