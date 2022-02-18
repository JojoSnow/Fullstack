import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
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

	test('when blog is created the values are right', () => {
		localStorage.setItem('loggedBlogUser', user)
		const mockHandler = jest.fn()

		render(<BlogForm createBlog={mockHandler} />)

		const inputs = screen.getAllByRole('textbox')
		userEvent.type(inputs[0], blog.title)
		userEvent.type(inputs[1], blog.author)
		userEvent.type(inputs[2], blog.url)
		const button = screen.getByText('Create')
		userEvent.click(button)

		expect(mockHandler.mock.calls).toContainEqual([{author: blog.author, title: blog.title, url: blog.url}])
	})
})