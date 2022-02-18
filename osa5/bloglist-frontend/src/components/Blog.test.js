import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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
	let container
	const mockHandler = jest.fn()

	beforeEach(() => {
		localStorage.setItem('loggedBlogUser', user)

		container = render(
			<Blog blog={blog} addLikes={mockHandler}>
				<div>
					content
				</div>
			</Blog>
		).container
	})

	test('only blog title and author show by default', () => {
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('click view and show also url and likes', () => {
		const button = screen.getByText('View')
		userEvent.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('button press uses props.addLikes() twice', () => {
		const button = screen.getByText('Like')
		userEvent.click(button)
		userEvent.click(button)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})

