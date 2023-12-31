import React from 'react'
import Write from './Write'
import { BrowserRouter } from 'react-router-dom';
import 'cypress-file-upload'
// Import necessary dependencies

describe('Write.jsx test', () => {
  beforeEach(() => {
    cy.mount(<BrowserRouter><Write /></BrowserRouter>);
  });

  it('should type title, description, price, contact and upload image', () => {
    // Assertions for title input
    cy.get('.content > input[type="text"]').should('exist');
    cy.get('.content > input[type="text"]').type('Test Title');
    cy.get('.content > input[type="text"]').should('have.value', 'Test Title');

    // Assertions for description input
    cy.get('.ql-editor').should('exist')
    cy.get('.ql-editor').type('Test Description');
    cy.get('.ql-editor').contains('Test Description');

    // Assertions for price input
    cy.get('.price').should('exist');
    cy.get('.price').type('2000.50');
    cy.get('.price').should('have.value', '2000.50');

    // Assertions for contact input
    cy.get('.contact').should('exist');
    cy.get('.contact').type('0999999999');
    cy.get('.contact').should('have.value', '099-999-9999');

    // Upload image
    cy.fixture('example.png').then(fileContent => {
      cy.get('.item input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'example.png',
        mimeType: 'image/png'
      });
    });
    cy.get('.item .drop-container').contains('example.png')
    cy.get('.cat input[value="music"]').check();

  });

  it('should price input field allows only whole numbers or decimals with two decimal places, and negative values are not allowed', () => {

    cy.get('.price').should('exist');
    cy.get('.price').type('2000.5000');
    cy.get('.price').should('have.value', '2000.50');

    cy.get('.price').clear()
    cy.get('.price').should('have.value', '');
    cy.get('.price').type('-2000');
    cy.get('.price').should('have.value', '2000');

    cy.get('.price').clear()
    cy.get('.price').should('have.value', '');
    cy.get('.price').type('Test price input');
    cy.get('.price').should('have.value', '');

  });

  it('should click submits form', () => {
    // Submit the form
    cy.get('button').contains("SELL").click();
  });
});
