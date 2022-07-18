/// <reference path="../support/index.d.ts" />

describe('Reset Password', () => {
  it('should show error if password does not match', () => {
    cy.visit('/reset-password?code=1234567')

    cy.findAllByPlaceholderText(/^password/i).type('123')
    cy.findAllByPlaceholderText(/confirm password/i).type('321')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText(/confirm password does not match with password/i).should(
      'exist'
    )
  })

  it('should show error if provided code is invalid', () => {
    cy.intercept('POST', '**/auth/reset-password?code=invalidcode', (res) => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [{ messages: [{ message: 'Incorrect code provided' }] }]
        }
      })
    })

    cy.visit('/reset-password?code=invalidcode')
    cy.findAllByPlaceholderText(/^password/i).type('123456')
    cy.findAllByPlaceholderText(/confirm password/i).type('123456')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText(/incorrect code provided./i).should('exist')
  })

  it('should fill the input and redirect to the home page with the user signed in', () => {
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { user: { email: 'cypress@email.com' } }
    })

    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: { user: { email: 'cypress@email.com' } }
    })

    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: { user: { email: 'cypress@email.com' } }
    })

    cy.intercept('GET', '**/auth/session*', {
      statusCode: 200,
      body: { user: { name: 'cypress', email: 'cypress@email.com' } }
    })

    cy.visit('/reset-password?code=valid-token')
    cy.findAllByPlaceholderText(/^password/i).type('123456')
    cy.findAllByPlaceholderText(/confirm password/i).type('123456')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.findByText('cypress').should('exist')
  })
})
