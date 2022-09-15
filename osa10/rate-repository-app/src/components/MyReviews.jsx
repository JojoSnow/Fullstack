import { View, FlatList, StyleSheet, Alert, Pressable } from 'react-native';

import useUser from '../hooks/useUser';
import useDeleteReview from '../hooks/useDeleteReview';

import { ItemSeparator } from './SingleRepository';
import Text from './custom/Text';
import SubHeading from './custom/SubHeading';
import Button from './custom/Button';
import ButtonText from './custom/ButtonText';
import theme from '../style/theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
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
	},
	buttons: {
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		width: '42%'
	}
});

const getDate = ( date ) => {
	return new Date(date).toLocaleDateString('fi', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
};

const ReviewItem = (props) => {
	const handleRepo = async () => {
		await props.navigate(`${props.review.repository.id}`, { replace: true });
	};

	const handleDelete = () => {
		Alert.alert(
			"Delete Review",
			"Are you sure you want to delete this review?",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Delete",
					onPress: async () => {
						try {
							await props.deleteReview(props.review.id);
						} catch (e) {
							console.error(e);
						}
					}
				}
			]
		);
	};

	return (
		<View>
			<View style={styles.review}>
				<View style={styles.ratingView}>
					<Text style={styles.rating}>{props.review.rating}</Text>
				</View>
				<View style={styles.content}>
					<SubHeading>{props.review.repository.fullName}</SubHeading>
					<Text style={styles.date}>{getDate(props.review.createdAt)}</Text>
					<Text>{props.review.text}</Text>
				</View>
			</View>
			<View style={styles.buttons}>
				<Pressable style={styles.button} onPress={handleRepo}>
					<Button>
						<ButtonText>View Repository</ButtonText>
					</Button>
				</Pressable>
				<Pressable style={styles.button} onPress={handleDelete}>
					<Button style={({backgroundColor: theme.colors.bgRed})}>
						<ButtonText>Delete Review</ButtonText>
					</Button>
				</Pressable>
				
			</View>
		</View>
	);
};

const MyReviews = () => {
	const [ deleteReview ] = useDeleteReview();
	const navigate = useNavigate();
	const { data, loading } = useUser({
		includeReviews: true
	});

	let reviews;

	if (data) {
		reviews = data.me
		? data.me.reviews.edges.map(edge => edge.node)
		: [];
	}

	return (
		<View>
			{loading || !data ?
			<Text>Fetching data ...</Text>			
			:
			<FlatList 
				data={reviews}
				renderItem={({item}) => <ReviewItem review={item} deleteReview={deleteReview} navigate={navigate} />}
				keyExtractor={({id}) => id}
				ItemSeparatorComponent={() => <ItemSeparator />}
			/>
			}
		</View>
	);
};

export default MyReviews;