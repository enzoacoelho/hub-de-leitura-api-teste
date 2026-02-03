// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('gerarToken', (email, password) => {
    cy.api({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": password
        },
    }).then((response) => {
        expect(response.status).equal(200)
        return response.body.token
    })
});

Cypress.Commands.add('cadastrarUsuario', (name, email, senha) => {
    cy.api({
        method: 'POST',
        url: 'users',
        body: {
            "name": name,
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).equal(201)
        return response.body.user.id
    })
});

Cypress.Commands.add('cadastrarLivro', (token, title, author, description, category,
    isbn, editor, language, publication_year, pages, format, total_copies, available_copies
) => {
    cy.api({
        method: 'POST',
        url: 'books',
        headers: {'Authorization': token},
        failOnStatusCode: false,
        body: {
            "title": title,
            "author": author,
            "description": description,
            "category": category,
            "isbn": isbn,
            "editor": editor,
            "language": language,
            "publication_year": publication_year,
            "pages": pages,
            "format": format,
            "total_copies": total_copies,
            "available_copies": available_copies
        }
    }).then((response) => {
        return response
    })
});

Cypress.Commands.add('alterarLivro', (livroID, token, title, author, description, category,
    isbn, editor, language, publication_year, pages, format, total_copies, available_copies
) => {
    cy.api({
        method: 'PUT',
        url: 'books/' + livroID,
        headers: {'Authorization': token},
        failOnStatusCode: false,
        body: {
            "title": title,
            "author": author,
            "description": description,
            "category": category,
            "isbn": isbn,
            "editor": editor,
            "language": language,
            "publication_year": publication_year,
            "pages": pages,
            "format": format,
            "total_copies": total_copies,
            "available_copies": available_copies
        }
    }).then((response) => {
        return response
    })
});

Cypress.Commands.add('deletarLivro', (livroID, token) => {
    cy.api({
        method: 'DELETE',
        url: 'books/' + livroID,
        headers: {'Authorization': token},
        failOnStatusCode: false,
    }).then((response) => {
        return response
    })
});