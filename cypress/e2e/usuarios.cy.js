/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

let token

beforeEach(() => {
    cy.gerarToken('admin@biblioteca.com', 'admin123').then(tkn => {
        token = tkn
    })

});

describe('GET - Teste de API - Gestão de Usuários', () => {

    it('Deve listar usuários com sucesso', () => {
        cy.api({
            method: 'GET',
            url: 'users',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).equal(200)
            expect(response.body.users).be.an('array')
        });
    });

    it('Deve validar propriedades de um usuário', () => {
        cy.api({
            method: 'GET',
            url: 'users',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).equal(200)
            expect(response.body.users[0]).have.property('id')
            expect(response.body.users[0]).have.property('name')
            expect(response.body.users[0]).have.property('email')
        });
    });

    it('Deve buscar um usuário por ID', () => {
        cy.api({
            method: 'GET',
            url: 'users/2',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).equal(200)
            expect(response.body).have.property('id')
            expect(response.body).have.property('name')
            expect(response.body).have.property('email')
        });
    });

    it('Deve buscar usuário com sucesso usando filtros', () => {
        cy.api({
            method: 'GET',
            url: 'users',
            headers: { 'Authorization': token },
            qs: {
                page: 1,
                limit: 20,
                search: "Usuário"
            }
        }).should(response => {
            expect(response.status).equal(200)

        });
    });

});

describe('POST - Teste de API - Gestão de Usuários', () => {

    it('Deve cadastrar um usuário com sucesso', () => {
        let email = faker.internet.email()
        let name = faker.person.fullName()
        let senha = faker.internet.password()

        cy.api({
            method: 'POST',
            url: 'users',
            //headers: { 'Authorization': token }
            body: {
                "name": name,
                "email": email,
                "password": senha
            }
        }).should(response => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Usuário criado com sucesso.')
        });
    });

    it('Deve validar mensagem de erro ao cadastrar com e-mail inválido - Cenário Negativo', () => {
        cy.api({
            method: 'POST',
            url: 'users',
            //headers: { 'Authorization': token }
            body: {
                "name": "Maria Santos",
                "email": "mariaemail.com",
                "password": "senha123"
            },
            failOnStatusCode: false
        }).should(response => {
            expect(response.status).equal(400)
            expect(response.body.message).equal('Formato de email inválido.')
        });
    });

});

describe('PUT - Teste de API - Gestão de Usuários', () => {
    it.skip('Deve atualizar um usuário com sucesso', () => {
        cy.api({
            method: 'PUT',
            url: 'users/9',
            headers: { 'Authorization': token },
            body: {
                "name": "Nice Coelho Alterado",
                "email": "nicecoelhoAlterado@gmail.com",
                "password": "tESTE@1234"
            }
        }).should(response => {
            expect(response.status).equal(200)
            expect(response.body.message).equal('Usuário atualizado com sucesso.')
        });
    });

    it('Deve atualizar um usuário com sucesso - Dinamico', () => {
        let name = faker.person.fullName()
        let email = faker.internet.email()
        let senha = faker.internet.password()

        cy.cadastrarUsuario(name, email, senha).then(userID => {
            cy.api({
                method: 'PUT',
                url: 'users/' + userID,
                headers: { 'Authorization': token },
                body: {
                    "name": name + ' Alterado',
                    "email": 'alterado' + email,
                    "password": senha
                }
            }).should(response => {
                expect(response.status).equal(200)
                expect(response.body.message).equal('Usuário atualizado com sucesso.')
            });
        })
    });
});

describe('DELETE - Teste de API - Gestão de Usuários', () => {
    it.skip('Deve deletar um usuário com sucesso', () => {
        cy.api({
            method: 'DELETE',
            url: 'users/9',
            headers: { 'Authorization': token }           
        }).should(response => {
            expect(response.status).equal(200)
            expect(response.body.message).equal('Usuário removido com sucesso.')
        });
    });

    it('Deve deletar um usuário com sucesso - Dinamico', () => {
        let name = faker.person.fullName()
        let email = faker.internet.email()
        let senha = faker.internet.password()

        cy.cadastrarUsuario(name, email, senha).then(userID => {
            cy.api({
                method: 'DELETE',
                url: 'users/' + userID,
                headers: { 'Authorization': token }                
            }).should(response => {
                expect(response.status).equal(200)
                expect(response.body.message).equal('Usuário removido com sucesso.')
            });
        })
    });
});

