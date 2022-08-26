import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	const { data, error, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
		onError: console.error(error)
	});

	if (loading) {
		console.log('loading')
	}

	if (!loading && data) {
		console.log('done loading');
		const repos = data.repositories;
		return { repos, loading };
	} else {
		return <div>
			<p>Error</p>
		</div>
	}
};

export default useRepositories;