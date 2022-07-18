/// <reference path="../support/index.d.ts" />

describe('Reset Password', () => {
  it('should show error if password does not match', () => {
    cy.visit('/reset-password?code=1234567')

    cy.findAllByPlaceholderText(/^password/i).type('123')
    cy.findAllByPlaceholderText(/confirm password/i).type('321')
    cy.findByRole('button', {name: /reset password/i}).click()

    cy.findByText(/confirm password does not match with password/i).should('exist')
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
    cy.findByRole('button', {name: /reset password/i}).click()

    cy.findByText(/incorrect code provided./i).should('exist')
  });
})
