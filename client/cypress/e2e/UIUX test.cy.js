describe('UI/UX testing', () => {
  const titleText = 'Testing Title';
  const descriptionText = 'This is a test description.';
  const priceText = "100";
  const contactText = '0812345678';
  const imagePath = 'cypress/fixtures/example.png';
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get(".links .login").click()
    cy.get('input[name="username"]').type("test")
    cy.get('input[name="password"]').type("pp150745")
    cy.get('button').should("have.text","Login").click()
  });
  it('Click Sell button', () => {
    cy.contains('SELL').click()
  })

  it('Click Read more', () => {
    cy.get('.link > button').first().should('have.text', 'Read More').click();
  })

  it('Click to select page test', () => {
    cy.get('.page-numbers .actives2').should('have.text', '2').click()
   });


   it('Click own item to single that have edit button, delete button, info and can delete', () => {
    cy.contains('SELL').click()
    cy.get('input[placeholder="Title"]').type(titleText);
    cy.get('.ql-editor').type(descriptionText);
    cy.get('input[class="price"]').type(priceText);
    cy.get('input[class="contact"]').type(contactText);

    cy.get('input[type="file"]').selectFile(imagePath, {force: true})
    cy.get('label[class="drop-container"] p').should("have.text", "example.png")
    cy.get('.cat input[value="music"]').check();
    cy.get(".buttons .button").click()
    cy.get(".swal2-confirm").click()
    cy.get('a[class="link"] h1').first().should("have.text", titleText).click()
    cy.get('.info .price').contains('Price:').invoke('text').should('include', priceText);
    cy.get('.info .contact').contains('Contact:').invoke('text').should('include', '081-234-5678');
    cy.get('.content > p').should('exist')
    cy.get('.edit > .editPost').should('exist')
    cy.get('.edit > .deletePost').should('exist').click()
    cy.get('.swal2-input').type("DELETE")
    cy.get('.swal2-confirm').click()
    cy.get('.swal2-title').should('have.text','Success')
    cy.get('.swal2-confirm').click()
  });
})