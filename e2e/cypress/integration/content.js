describe('test content', function() {
  beforeEach('clear', function() {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.autologin()
    cy.visit('/db/container/')
    cy.get('td:nth-child(4)')
      .should('contain', 'Groups')
      .should('contain', 'Users')
  })
  it('creates a folder as Admin, then deletes it', function() {
    // Create Folder
    cy.get('.dropdown-trigger > .button > .icon').click()
    cy.get('#dropdown-menu > .dropdown-content > :nth-child(2)').click()
    cy.get('.title').should('contain', 'Add Folder')
    cy.get('#title').type('Test Folder')
    cy.get('#id').should('have.value', 'test-folder')
    cy.get('.level > .button').click()
    cy.get('.notification').should('contain', 'Content created!')
    
    // Delete Folder
    cy.get('tr:contains(Test Folder) .delete').click()
    cy.get('.level-right > .control > .button').click()
    cy.get('.notification').should('contain', 'Items removed!')
  })

  it('creates an item as Admin, modifies it and delete it', function() {
    // Create Item
    cy.get('.dropdown-trigger > .button > .icon').click()
    cy.get('#dropdown-menu > .dropdown-content > :nth-child(1)').click()
    cy.get('.title').should('contain', 'Add Item')
    cy.get('#title').type('Test Item')
    cy.get('#id').should('have.value', 'test-item')
    cy.get('.level > .button').click()
    cy.get('.notification').should('contain', 'Content created!')

    // Modify Item
    cy.get('td:contains(Test Item)').click()
    cy.get(':nth-child(1) > :nth-child(2) > .editable > .icon > .svg-inline--fa').click()
    cy.get('.input').clear().type('Test Modified Item')
    cy.get(':nth-child(1) > .control > .button').click()
    cy.get('.notification').should('contain', 'Field title, updated!')
    cy.get('.breadcrumb a:contains(container)').click()

    // Delete Item
    cy.get('tr:contains(Test Modified Item) .delete').click()
    cy.get('.level-right > .control > .button').click()
    cy.get('.notification').should('contain', 'Items removed!')
  })

  it.only('creates a User as Admin, modifies it and delete it', function() {
    cy.get('td:contains(UserManager)').click()

    // Create User
    cy.get('.level-right > .button').click()
    cy.get('#id-0').type('Test User')
    cy.get('#id-2').type('test-user@test.test')
    cy.get('#id-4').type('Test Name')
    cy.get('#id-6').type('TestPassword')
    cy.get('p.control > .button').should('contain', 'Add User').click()
    cy.get('.notification').should('contain', 'Content created!')

    // Modify Item
    cy.get('td:contains(Test User)').click()
    cy.get('#id-81').clear().type('Test Modified User')
    cy.get('p.control > .button').click()
    cy.get('.notification').should('contain', 'Data updated')
    cy.get('.breadcrumb a:contains(users)').click()

    // Delete Item
    cy.get('tr:contains(Test User) .delete').click()
    cy.get('.level-right > .control > .button').click()
    cy.get('.notification').should('contain', 'Items removed!')
  })
})