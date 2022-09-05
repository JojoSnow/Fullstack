import { View, Pressable } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import RepositoryItem from './RepositoryItem';
import Text from './custom/Text';
import Button from './custom/Button';
import ButtonText from './custom/ButtonText';
import useRepository from '../hooks/useRepository';

const Repository = () => {
	const { id } = useParams();
	const { data, loading } = useRepository(id);
	
	console.log(data);

	const handlePress = () => {
		console.log('press')
		// Linking.openURL(data.url);
	};

	return (
		<View>
			{loading || !data ?
			<Text>Fetching data ...</Text>			
			:
			<View>
				<RepositoryItem item={data} />
				<Pressable onPress={handlePress}>
					<Button>
						<ButtonText>Open in Github</ButtonText>
					</Button>
				</Pressable>
			</View>
			}
		</View>
	);
};

export default Repository;