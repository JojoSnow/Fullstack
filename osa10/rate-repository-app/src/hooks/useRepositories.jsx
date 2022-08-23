import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	const [ repositories, setRepositories ] = useState();
	const { data, error, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
		onError: console.error(error)
	});

	console.log(error);

		setRepositories(data.repositories);


	return { repositories, loading };
};

export default useRepositories;