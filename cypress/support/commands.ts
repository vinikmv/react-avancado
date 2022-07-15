import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', {name: /cyberpunk 2077/i})
    cy.findByRole('link', {name: /buy now/i})

    cy.get('.slick-dots > :nth-child(2) > button').click()
    cy.wait(500)

    cy.findByRole('heading', {name: /horizon zero dawn/i})
    cy.findByRole('link', {name: /buy now/i})

    
    cy.get('.slick-dots > :nth-child(3) > button').click()
    cy.wait(500)

    
    cy.findByRole('heading', {name: /huge promotion/i})
    cy.findByRole('link', {name: /browse games/i})
  })
})


Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false}) => {
  cy.get(`[data-cy="${name}"]`).within(() => {
    cy.findByRole('heading', {name}).should('exist')

  })
})