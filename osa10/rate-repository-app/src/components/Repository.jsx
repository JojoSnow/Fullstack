import { FlatList, View, StyleSheet, Image } from 'react-native';

import theme from '../style/theme';
import Text from './Text';
import SubHeading from './Subheading';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	item: {
		backgroundColor: 'white',
		display: 'flex',
		padding: 15
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 5
	},
	info: {
		paddingLeft: 15
	},
	infoPart: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignContent: 'space-between'
	},
	infoText: {
		marginBottom: 5 
	},
	language: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.textLight,
		borderRadius: 3.5,
		padding: 3,
		alignSelf: 'flex-start'
	},
	description: {
		color: theme.colors.textSecondary,
	},
	countsPart: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 5
	},
	counts: {
		textAlign: 'center',
		fontWeight: theme.fontWeights.bold
	},
	countsText: {
		color: theme.colors.textSecondary,
		textAlign: 'center',
		fontWeight: theme.fontWeights.normal
	}
});

const repositories = [
	{
		id: 'jaredpalmer.formik',
		fullName: 'jaredpalmer/formik',
		description: 'Build forms in React, without the tears',
		language: 'TypeScript',
		forksCount: 1589,
		stargazersCount: 21553,
		ratingAverage: 88,
		reviewCount: 4,
		ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
	},
	{
		id: 'rails.rails',
		fullName: 'rails/rails',
		description: 'Ruby on Rails',
		language: 'Ruby',
		forksCount: 18349,
		stargazersCount: 45377,
		ratingAverage: 100,
		reviewCount: 2,
		ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
	},
	{
		id: 'django.django',
		fullName: 'django/django',
		description: 'The Web framework for perfectionists with deadlines.',
		language: 'Python',
		forksCount: 21015,
		stargazersCount: 48496,
		ratingAverage: 73,
		reviewCount: 5,
		ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
	},
	{
		id: 'reduxjs.redux',
		fullName: 'reduxjs/redux',
		description: 'Predictable state container for JavaScript apps',
		language: 'TypeScript',
		forksCount: 13902,
		stargazersCount: 52869,
		ratingAverage: 0,
		reviewCount: 0,
		ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
	}
];

const ItemSeparator = () => <View style={styles.separator} />;

const formatNum= (num) => {
	if (num >= 1000) {
		const roundedNum = Math.round(num/100)*100;
		return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.').slice(0, -2) + 'k';
	} else {
		return num;
	}
	
};

const RepositoryInfo = ({item}) => (
	<View style={styles.infoPart}>
		<Image 
			source={{ uri: item.ownerAvatarUrl }} 
			style={styles.image} 
		/>
		<View style={styles.info}>
			<SubHeading style={styles.infoText}>{item.fullName}</SubHeading>
			<Text style={[styles.description, styles.infoText]}>{item.description}</Text>
			<Text style={[styles.language, styles.infoText]}>{item.language}</Text>
		</View>
	</View>
)

const RepositoryCounts = ({item}) => (
	<View style={styles.countsPart}>
		<View>
			<Text style={styles.counts}>{formatNum(item.stargazersCount)}</Text>
			<Text style={styles.countsText}>Stars</Text>
		</View>
		<View>
			<Text style={styles.counts}>{formatNum(item.forksCount)}</Text>
			<Text style={styles.countsText}>Forks</Text>
		</View>
		<View>
			<Text style={styles.counts}>{item.reviewCount}</Text>
			<Text style={styles.countsText}>Reviews</Text>
		</View>
		<View>
			<Text style={styles.counts}>{item.ratingAverage}</Text>
			<Text style={styles.countsText}>Rating</Text>
		</View>
	</View>
)

const RepositoryItem = ({ item }) => (
	<View style={styles.item}>
		<RepositoryInfo item={item} />
		<RepositoryCounts item={item} />		
	</View>
)

const RepositoryList = () => (
	<FlatList
		data={repositories}
		ItemSeparatorComponent={ItemSeparator}
		renderItem={RepositoryItem}
	/>
);

export default RepositoryList;