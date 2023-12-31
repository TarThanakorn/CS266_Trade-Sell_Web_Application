describe('Page for Admin Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get(".links .login").click()
    cy.get('input[name="username"]').type("admin")
    cy.get('input[name="password"]').type("123456")
    cy.get('button').should("have.text","Login").click()
  });

  it('Admin will be able to delete other users posts even if they are not their own', () => {
    cy.get('.content > a').first().click()
    cy.get('.edit > .deletePost').should('exist')
    cy.get('.edit > .editPost').should('not.exist')
  })

  it('Admin will not be able to click to go to the Profile window.', () => {
    cy.get('.links .link').click()
    cy.url().should('match', /http:\/\/localhost:3000/);
  })


  it('Admin will not be able to use the Sell button', () => {
    
    cy.get('.sell').should('not.exist')
  })
})