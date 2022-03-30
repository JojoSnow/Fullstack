import {useState} from 'react'
import {useApolloClient, useSubscription} from '@apollo/client'

import {BOOK_ADDED, ALL_BOOKS} from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

export const updateCache = (cache, query, addedBook) => {
	const uniqByTitle = (a) => {
		let seen = new Set()
		return a.filter((item) => {
			let k = item.title
			return seen.has(k) ? false : seen.add(k)
		})
	}
	cache.updateQuery(query, ({allBooks}) => {
		return {
			allBooks: uniqByTitle(allBooks.concat(addedBook))
		}
	})
}

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({subscriptionData}) => {
			const addedBook  =subscriptionData.data.bookAdded
			window.alert(`${addedBook.title} added`)
			updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
		}
	})

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage('authors')
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>Authors</button>
				<button onClick={() => setPage('books')}>Books</button>
				{!token ? 
					<button onClick={() => setPage('login')}>Login</button> :
					<><button onClick={() => setPage('add')}>Add book</button>
					<button onClick={() => setPage('recommend')}>Recommend</button>
					<button onClick={logout}>Logout</button></>
				}
				
			</div>

			<Authors show={page === 'authors'} />
 			<Books show={page === 'books'} />
 			<NewBook show={page === 'add'} />
			<Recommend show={page === 'recommend'} />
			<LoginForm show={page === 'login'} setToken={setToken} />
		</div>
  )
}

export default App