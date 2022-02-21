describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Jojo Snow',
			username: 'snowy',
			password: 'pvris'
		}
		const user1 = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.request('POST', 'http://localhost:3003/api/users', user1)
		cy.visit('http://localhost:3003')
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')
	})

	describe('Login', function() {
		it('fails with wrong credentials', function() {
			cy.get('#username').type('snowy')
			cy.get('#password').type('wrong')
			cy.get('#loginBtn').click()

			cy.get('html').should('not.contain', 'Jojo Snow logged in')
		})

		it('succeeds with correct credentials', function() {
			cy.get('#username').type('snowy')
			cy.get('#password').type('pvris')
			cy.get('#loginBtn').click()

			cy.get('html').should('contain', 'Jojo Snow logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({username: 'snowy', password: 'pvris'})

			cy.createBlog({author: 'The Dev', title: 'Created by Cypress', url: 'lost in space'})
		})

		it('blog can be created', function() {
			cy.get('html').should('contain', 'Created by Cypress The Dev')
		})

		it('blog can be liked', function() {
			cy.contains('View').click()
			cy.contains('Like').click()

			cy.reload()
			cy.contains('View').click()
			cy.get('html').should('contain', 'likes 1')
		})

		it('blog can be removed by the user who created the blog', function() {
			cy.contains('View').click()
			cy.contains('Remove').click()

			cy.reload()
			cy.get('html').should('not.contain', 'Created by Cypress The Dev')
		})

		it('blog cannot be removed by an user who did not create it', function () {
			cy.get('#logoutBtn').click()
			cy.login({username: 'mluukkai', password: 'salainen'})

			cy.contains('View').click()
			cy.get('html').should('not.contain', 'Remove')
		})

		it('blogs are sorted by likes with highest like on the top', function () {
			cy.createBlog({author: 'The Tester', title: 'Testing with Cypress', url: 'who knows'})

			cy.contains('Created by Cypress The Dev').parent().find('button').click()
			cy.contains('Like').click()

			cy.reload()

			cy.contains('Created by Cypress The Dev').parent().find('button').click()
			cy.contains('likes 1')
			cy.contains('Testing with Cypress The Tester').parent().find('button').click()
			cy.contains('likes 0')
		})
	})
})