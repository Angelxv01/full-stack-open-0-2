import { string } from 'prop-types'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      name: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login Form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('button:submit').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('boot')
      cy.get('button:submit').click()

      cy.get('.error')
        .should('contain', 'Invalid user or password')
        .and('have.css', 'border-color', 'rgb(255, 30, 30)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'root' })
    })

    it('A blog can be created', function () {
      cy.contains('create').click()
      cy.get('#title').type('First cypress test')
      cy.get('#author').type('Angel')
      cy.get('#url').type('dummy')

      cy.get('form').submit()

      cy.get('.success')
        .should('contain', 'a new blog First cypress test by Angel added')
        .and('have.css', 'border-color', 'rgb(7, 182, 7)')
    })

    it('User can like a blog', function () {
      cy.addBloglist({
        author: 'Angel',
        url: 'dummy',
        title: 'Second test with cypress'
      })
      cy.get('.toggleShow').click()
      cy.get('.like').click()
      cy.get('.like').parent().contains('1')
    })

    it('User can delete post he created', function () {
      cy.addBloglist({
        author: 'Angel',
        url: 'dummy',
        title: 'Third test with cypress'
      })
      cy.get('.toggleShow').click()
      cy.get('.remove').click()
      cy.contains('Third test with cypress').should('not.exist')
    })

    it('User cannot delete post he did not created', function () {
      const user = {
        username: 'dummy',
        name: 'dummy',
        password: 'dummy'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.addBloglist({
        author: 'Angel',
        url: 'dummy',
        title: 'Third test with cypress'
      })
      cy.contains('log out').click()

      cy.login({ username: 'dummy', password: 'dummy' })

      // assuming there's only one blog and dummy isn't the creator
      cy.get('.toggleShow').click()
      cy.get('.remove').should('not.exist')
    })

    it.only('Should see ordered post', function () {
      cy.addBloglist({
        title: 'Order 3',
        likes: '1',
        author: 'Angel',
        url: 'dummy'
      })
      cy.addBloglist({
        title: 'Order 1',
        likes: '10',
        author: 'Angel',
        url: 'dummy'
      })
      cy.addBloglist({
        title: 'Order 2',
        likes: '5',
        author: 'Angel',
        url: 'dummy'
      })

      cy.get('.base').then(function (blogs) {
        cy.wrap(blogs).should(
          'equal',
          blogs.sort(function (a, b) {
            return b.likes - a.likes
          })
        )
      })
    })
  })
})
