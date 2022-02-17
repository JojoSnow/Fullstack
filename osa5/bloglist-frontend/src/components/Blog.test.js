import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

	test('only blog title and author show by default', () => {
		const user = {
			username: 'The Dev',
			name: 'The Tester'
		}
		const blog = {
			title: 'Testing Blog',
			author: 'The Dev',
			url: 'devoured by code',
			likes: 10,
			user: user
		}

		localStorage.setItem('loggedBlogUser', user)

		render(<Blog blog={blog} />)

		const p = screen.queryByText('Testing Blog The Dev')
		expect(p).toBeDefined()
	})
})

