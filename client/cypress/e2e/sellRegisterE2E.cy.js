
import 'cypress-file-upload'

describe('testing sell register feature', () => {
  //Test Data
  const titleText = 'Testing Title';
  const descriptionText = 'This is a test description.';
  const priceText = "100";
  const contactText = '0812345678';
  const imagePath = 'cypress/fixtures/example.png';
  
  it('should pass open localhost:3000', () => {
    cy.visit('http://localhost:3000/')
  })

  it('should have sell Button (span) with className "sell"', () => {
    cy.visit('http://localhost:3000/')
    cy.get(".links .login").click()
    cy.get('input[name="username"]').type("test")
    cy.get('input[name="password"]').type("pp150745")
    cy.get('button').should("have.text","Login").click()
    cy.get('.sell').should('exist').should('have.text', 'SELL');
  });

  it('click sell Button should go sell page', () => {
    cy.visit('http://localhost:3000/')
    cy.get(".links .login").click()
    cy.get('input[name="username"]').type("test")
    cy.get('input[name="password"]').type("pp150745")
    cy.get('button').should("have.text","Login").click()
    cy.contains('SELL').click()
    cy.url().should('match', /http:\/\/localhost:3000\/sell/)
  });
  
  it('Can insert information to title, describe, price, picture, and contact field', () => {
    cy.visit('http://localhost:3000/sell');
    cy.get('input[placeholder="Title"]').type(titleText);
    cy.get('.editor').type(descriptionText);
    cy.get('input[class="price"]').type(priceText);
    cy.get('input[class="contact"]').type(contactText);

    cy.get('input[type="file"]').selectFile(imagePath, {force: true})
    cy.get('label[class="drop-container"] p').should("have.text", "example.png")
    cy.get('input[placeholder="Title"]').should('have.value', titleText);
    cy.get('.ql-editor').should('have.text', descriptionText);
    cy.get('input[class="price"]').should('have.value', priceText);
    cy.get('input[class="contact"]').should('have.value', '081-234-5678');
    cy.get('input[type="file"]').should('exist');
  });

  it('should redirect to home page when click publish button and already insert data', () => {
    cy.visit('http://localhost:3000/sell');

    cy.get('input[placeholder="Title"]').type(titleText);
    cy.get('.ql-editor').type(descriptionText);
    cy.get('input[class="price"]').type(priceText);
    cy.get('input[class="contact"]').type(contactText);
    cy.get('input[type="file"]').selectFile(imagePath, {force: true})
    cy.get('label[class="drop-container"] p').should("have.text", "example.png")
    cy.get('.cat input[value="music"]').check();
    cy.contains('SELL').click();
    cy.url().should('include', 'http://localhost:3000/');
  });

  it('should save new item record success and show item record in home page', () => {
    cy.visit('http://localhost:3000/');
    cy.get(".links .login").click()
    cy.get('input[name="username"]').type("test")
    cy.get('input[name="password"]').type("pp150745")
    cy.get('button').should("have.text","Login").click()
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
    cy.get('a[class="link"] h1').first().should("have.text", titleText)
    cy.task('queryDB', 'DELETE FROM `posts` ORDER BY `id` DESC LIMIT 1;')
  });

})