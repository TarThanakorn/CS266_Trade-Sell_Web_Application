describe('bigPicture function testing', () => {

  it('should show big picture when click picture', () => {
    cy.visit('http://localhost:3000/')
    cy.get(".content .link").first().click()
    cy.get(".content > img").first().click()
    cy.get('img[class="currentPic"]').invoke('attr', 'style').should('include', 'width: 100%; height: auto;');
  })
  it('picture should back to small when click any position on screen', () => {
    cy.visit('http://localhost:3000/')
    cy.get(".content .link").first().click()
    cy.get(".content > img").first().click()
    cy.get('img[class="currentPic"]').invoke('attr', 'style').should('include', 'width: 100%; height: auto;');
    cy.get('img[class="currentPic"]').click()
    cy.get(".content > img").first().should('have.css', 'height' ,'300px');
  })
})