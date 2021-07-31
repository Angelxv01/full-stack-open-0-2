Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then(function ({ body }) {
    window.localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add(
  'addBloglist',
  function ({ author, title, url, likes = 0 }) {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { author, title, url, likes },
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem('loggedUser')).token
        }`
      }
    })
    cy.visit('http://localhost:3000')
  }
)
