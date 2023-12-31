describe('Profile testing', () => {
  const fname = "test"
  const lname = "tester"
  const phone = "0812345678"
  const birthday = "2002-07-15"
  it('should update profile', () => {
    cy.visit('http://localhost:3000/')
    cy.get(".links .login").click()
    cy.get('input[name="username"]').type("test")
    cy.get('input[name="password"]').type("pp150745")
    cy.get('button').should("have.text","Login").click()
    cy.get('.container .navbar .links > span > a.link').should("have.text"," test").click()
    cy.get('input[type="file"]').selectFile('cypress/fixtures/profile.png', {force: true})
    cy.get('input[name="fname"]').then(input =>{
      cy.get(input).clear()
      cy.get(input).type(fname)
    })
    cy.get('input[name="lname"]').then(input =>{
      cy.get(input).clear()
      cy.get(input).type(lname)
    })
    cy.get('input[name="phone"]').then(input =>{
      cy.get(input).clear()
      cy.get(input).type(phone)
    })
    cy.get('input[name="email"]').should('have.value', 'tester@gmail.com')

    // user ไม่สามารถแก้ไข email ได้ แสดงผลเพียง email ปัจจุบัน
    cy.get('input[name="email"]').should('have.attr', 'readOnly')
    cy.get('input[name="birthday"]').then(input =>{
      cy.get(input).clear()
      cy.get(input).type(birthday)
    })
    cy.get('button').should('have.text', 'Save Changes').then(input =>{
      cy.get(input).click()
    })

    cy.task('queryDB', 'SELECT * FROM `users` WHERE `username` = "test";').then(res => {
      const user = JSON.parse(JSON.stringify(res)); 
      assert.equal(user[0].fname, fname);
      assert.equal(user[0].lname, lname);
      assert.equal(user[0].phone, phone);
      const dbDate = new Date(user[0].birthday);
      const localOffset = dbDate.getTimezoneOffset() * 60000; // in milliseconds
      const localDate = new Date(dbDate.getTime() - localOffset);
      var birthdayDB = localDate.toISOString().split('T')[0]
      assert.equal(birthdayDB, birthday);
    });
    
  })

  it('should show message No Permission on update profile page when not login', () => {
    cy.visit('http://localhost:3000/profile/1')
    cy.get('.card2 > h1').should("have.text","No Permission").click()
    
  })
})