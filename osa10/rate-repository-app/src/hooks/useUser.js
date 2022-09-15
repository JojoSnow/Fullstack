import { useQuery } from '@apollo/client';

import { USER } from '../graphql/queries';

const useUser = (variables) => {
	const { data, loading, ...result } = useQuery(USER, {
		variables,
		fetchPolicy: 'cache-and-network'
	});

	return { data, loading, ...result };
};

export default useUser;