import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order) => {
	const { data, loading } = useQuery(GET_REPOSITORIES, {
		variables: order,
		fetchPolicy: 'cache-and-network'
	});

	return { data, loading };
};

export default useRepositories;