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
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('snowy')
			cy.get('#password').type('pvris')
			cy.get('#loginBtn').click()

			cy.get('html').should('contain', 'Jojo Snow logged in')

			cy.get('#logoutBtn').click()
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('snowy')
			cy.get('#password').type('wrong')
			cy.get('#loginBtn').click()

			cy.get('html').should('not.contain', 'Jojo Snow logged in')
		})
	})
})