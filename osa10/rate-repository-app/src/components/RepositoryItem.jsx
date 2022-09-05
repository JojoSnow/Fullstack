import { View, Image, StyleSheet } from 'react-native';


import SubHeading from './custom/SubHeading';
import Text from './custom/Text';
import theme from "../style/theme";

const styles = StyleSheet.create({
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
	<View testID="repositoryItem" style={styles.item}>
		<RepositoryInfo item={item} />
		<RepositoryCounts item={item} />		
	</View>
);

export default RepositoryItem;