import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const authLink = setContext((_, {headers}) => {
	const token = localStorage.getItem('libraryUserToken')
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null
		}
	}
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(new HttpLink({uri: 'http://localhost:4000'}))
})

const query = gql`
	query {
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`

client.query({query})
	.then((response) => {
		console.log(response.data)
	})
 
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)