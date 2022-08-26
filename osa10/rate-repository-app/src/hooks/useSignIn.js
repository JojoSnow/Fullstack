import { useMutation } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
	const [ mutate, result ] = useMutation(AUTHENTICATE);

	const signIn = async ({ username, password }) => {
		console.log('start')
		const credentials = { username, password };
		
		console.log(credentials)
		await mutate({ credentials: credentials })
		console.log('done')
	}

	return [signIn, result];
};

export default useSignIn;