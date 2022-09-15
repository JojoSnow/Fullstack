import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
	uri: Constants.manifest.extra.apolloUri
});

const cache = new InMemoryCache({
	typePolicies: {
		Repositories: {
			fields: {
				repositories: relayStylePagination()
			}
		},
		Repository:  {
			fields: {
				reviews: relayStylePagination()
			}
		}
	}
});

const createApolloClient = (authStorage) => {
	const authLink = setContext(async (_, { headers }) => {
		try {
			const accessToken = await authStorage.getAccessToken();
			return {
				headers: {
					...headers,
					authorization: accessToken ? accessToken : ''
				}
			};
		} catch (e) {
			console.error(e);
			return {
				headers
			};
		}
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache,
	});
};

export default createApolloClient;