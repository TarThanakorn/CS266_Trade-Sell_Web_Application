describe('Catagory testing', () => {
  it('Assuming you have a set of elements with the class name "cata" and show catagory that user selecting', () => {
    cy.visit('http://localhost:3000/')
    //music
    cy.get(".menu .music").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'music');
    });

    //Elec
    cy.get(".menu .elec").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'electronic');
    });
  
    //Health & beauty
    cy.get(".menu .healbea").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'health');
    });

    //Furniture
    cy.get(".menu .furni").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'furniture');
    });

    //Clothing
    cy.get(".menu .cloth").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'clothing');
    });

    //Other
    cy.get(".menu .other").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'other');
    });
  })

  it('when selecting any product list page If you press to select a category, you must return to page 1 and display only products in that category.', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.page-numbers .actives2').click()
    cy.get(".menu .elec").click()
    cy.get('.cata').each(($element) => {
      cy.wrap($element).should('have.text', 'electronic');
    });
  })
})