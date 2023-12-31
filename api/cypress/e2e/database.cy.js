describe('database', () => {
  it('passes', () => {
    cy.task('queryDB', 'SELECT * FROM `posts` WHERE 1;').then(res => {
      // Log each row
      res.forEach((row, index) => {
        cy.log(`Row ${index + 1}:`, JSON.stringify(row));
      });

    });
  });
});
