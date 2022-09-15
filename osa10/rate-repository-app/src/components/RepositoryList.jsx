import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

import theme from '../style/theme';
import Text from './custom/Text';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	search: {
		marginTop: 10,
		marginHorizontal: 15
	},
	menu: {
		marginVertical: 5,
		marginHorizontal: 15
	},
	menuItem: {
		color: theme.colors.textSecondary
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = (props) => {

	const latestRepos = {
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC',
		searchKeyword: ''
	};
	const highestRepos = {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'DESC',
		searchKeyword: ''
	};
	const lowestRepos = {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'ASC',
		searchKeyword: ''
	};
	const searchRepos = {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'DESC',
		searchKeyword: props.search
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

	const onChangeSearch = (query) => {
		props.setSearch(query);
	};

	const handleSearch = () => {
		console.log(searchRepos)
		props.setOrder(searchRepos);
	};

	return (
		<>
			<Searchbar
				placeholder="Search"
				onChangeText={onChangeSearch}
				onSubmitEditing={handleSearch}
				placeholderTextColor={theme.colors.textSecondary}
				value={props.search}
				style={styles.search}
			/>
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
		</>
	);
};

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const props = this.props;

		return (
			<RepositoryListHeader
				order={props.order} 
				setOrder={props.setOrder} 
				search={props.search} 
				setSearch={props.setSearch} 
			/>
		);
	};

	render() {
		const props = this.props;
		let repositoryNodes;

		if (props.data) {
			repositoryNodes = props.data.repositories
			? props.data.repositories.edges.map(edge => edge.node)
			: [];
		}

		return (
			<View>
				{props.loading || !props.data ?
					<Text>Fetching data ...</Text>
					:
					<FlatList
						data={repositoryNodes}
						ItemSeparatorComponent={ItemSeparator}
						ListHeaderComponent={this.renderHeader}
						onEndReached={props.onEndReach}
						onEndReachedThreshold={0.5}
						renderItem={({item}) => (
							<View>
								<Pressable onPress={() => {
									const id = item.id;
									props.navigate(`${id}`, { replace: true })
								}}>
									<RepositoryItem item={item} />
								</Pressable>
							</View>
						)}
					/>
				}
			</View>
		);
	}	
}

const RepositoryList = () => {
	const [search, setSearch] = useState(String);
	const [order, setOrder] = useState({
		orderBy: 'CREATED_AT', 
		orderDirection: 'DESC',
		searchKeyword: search,
		first: 8
	});
	const { data, loading, fetchMore } = useRepositories(order);
	const navigate = useNavigate();

	const onEndReach = () => {
		fetchMore();
	};

	return <RepositoryListContainer 
		data={data} 
		loading={loading} 
		onEndReach={onEndReach}
		navigate={navigate} 
		order={order} 
		setOrder={setOrder} 
		search={search}
		setSearch={setSearch}	
	/>;
};

export default RepositoryList;