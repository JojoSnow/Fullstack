import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import theme from '../style/theme';
import RepositoryItem from './RepositoryItem';
import Text from './custom/Text';
import Button from './custom/Button';
import ButtonText from './custom/ButtonText';
import useRepository from '../hooks/useRepository';
import SubHeading from './custom/SubHeading';

const styles = StyleSheet.create({
	view: {
		backgroundColor: 'white',
		paddingBottom: 10,
		marginBottom: 10
	},
	separator: {
		height: 10,
	},
	review: {
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignContent: 'space-between',
		padding: 10
	},
	ratingView: {
		borderStyle: 'solid',
		borderColor: theme.colors.primary,
		borderWidth: 2,
		borderRadius: 25,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	rating: {
		color: theme.colors.primary,
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold,
	},
	content: {
		flexShrink: 1,
		paddingLeft: 10
	},
	date: {
		color: theme.colors.textSecondary
	}
});

export const ItemSeparator = () => <View style={styles.separator} />;

const Repository = (data) => {
	if (data) {
		return (
			<View style={styles.view}>
				<RepositoryItem item={data.data.repository} />
				<Pressable onPress={() => Linking.openURL(data.data.repository.url)}>
					<Button>
						<ButtonText>Open in Github</ButtonText>
					</Button>
				</Pressable>
			</View>
		);
	}		
};

const getDate = ( date ) => {
	return new Date(date).toLocaleDateString('fi', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
};

const ReviewItem = ({review}) => {
	return (
		<View style={styles.review}>
			<View style={styles.ratingView}>
				<Text style={styles.rating}>{review.rating}</Text>
			</View>
			<View style={styles.content}>
				<SubHeading>{review.user.username}</SubHeading>
				<Text style={styles.date}>{getDate(review.createdAt)}</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

const SingleRepository = () => {
	const { id } = useParams();
	const { data, loading, fetchMore } = useRepository({
		repositoryId: id,
		first: 8
	});
	let reviews;

	if (data) {
		reviews = data.repository
		? data.repository.reviews.edges.map(edge => edge.node)
		: [];
	}

	const onEndReach = () => {
		fetchMore();
	};

	return (
		<View>
			{loading || !data ?
			<Text>Fetching data ...</Text>			
			:
			<FlatList 
				data={reviews}
				renderItem={({item}) => <ReviewItem review={item} />}
				keyExtractor={({id}) => id}
				ListHeaderComponent={() => <Repository data={data} />}
				ItemSeparatorComponent={() => <ItemSeparator />}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
			/>
			}
		</View>
	);
};

export default SingleRepository;