describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Jojo Snow',
			username: 'snowy',
			password: 'pvris'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
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
		})

		it('A blog can be created', function() {
			cy.contains('Create New Blog').click()

			cy.get('#title').type('Created by Cypress')
			cy.get('#author').type('The Dev')
			cy.get('#url').type('lost in space')

			cy.get('#createBtns').click()

			cy.get('html').should('contain', 'Created by Cypress The Dev')
		})
	})
})