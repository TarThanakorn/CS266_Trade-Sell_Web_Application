// navbar_spec.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the path to your Navbar component
import { AuthContext } from "../context/authContext";
describe('Navbar Category test', () => {
  it('renders correctly', () => {
    // Mount the component within the necessary context and router
    cy.mount(
      <Router>
        <AuthContext.Provider value={{ currentUser: { }, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </Router>
    );

    // Assertions
    cy.get('.navbar').should('exist'); // Replace with an appropriate selector for the main navbar container
    cy.get('.logo img').should('have.attr', 'src').and('match', /logo.*.png/); // Replace with the correct path to your logo
    cy.get('.menu .link').should('have.length', 6); // Assuming there are 6 menu links
    cy.get('.links').should('exist');
  });

  it('displays login link when not logged in', () => {
    // Mount the component without providing AuthContext to simulate not being logged in
    cy.mount(
      <Router>
       <AuthContext.Provider value={{ currentUser: { }, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </Router>
    );

    // Assertions for the login link
    cy.get('.links .login').should('have.text', 'Login');
  });

  it('displays Category', () => {
    // Mount the component without providing AuthContext to simulate not being logged in
    cy.mount(
      <Router>
       <AuthContext.Provider value={{ currentUser: { }, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </Router>
    );

    // Assertions for the login link
    cy.get('.menu .music').should('have.text', 'Music');
    cy.get('.menu .elec').should('have.text', 'Electronic');
    cy.get('.menu .healbea').should('have.text', 'Health & Beauty');
    cy.get('.menu .furni').should('have.text', 'Furniture');
    cy.get('.menu .cloth').should('have.text', 'Clothing');
    cy.get('.menu .other').should('have.text', 'Other');
  });

  it('displays user info and logout when logged in', () => {
    // Mount the component with AuthContext to simulate being logged in
    cy.mount(
      <Router>
        <AuthContext.Provider value={{ currentUser: { username: 'TestUser' }, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </Router>
    );
    // Assertions for the user info and logout
    cy.get('.links').contains('TestUser').should('exist');
    cy.get('.links .logout').should('have.text', 'Logout');
  });
});
