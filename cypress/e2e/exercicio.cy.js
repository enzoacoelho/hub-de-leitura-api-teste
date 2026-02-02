/// <reference types="cypress" />

describe('Testes da Funcionalidade Catálogo de Livros', () => {

     let token
     beforeEach(() => {
          cy.gerarToken('admin@biblioteca.com', 'admin123').then(tkn => {
               token = tkn
          })
     });

     // Objetivo: Verificar que a API retorna lista de livros com paginação e filtros funcionando
     // Validar que filtros por categoria e autores funcionam corretamente
     it('GET - Deve listar livros com filtros e paginação', () => {
          cy.api({
               method: 'GET',
               url: 'books',
               qs: {
                    search: "O Alquimista",
                    category: "Ficção",
                    author: "Paulo Coelho",
                    limit: 20
               }
          }).should(response => {
               expect(response.status).equal(200)
               response.body.books.forEach(livro => {
                    expect(livro.title).to.include("Alquimista") 
                    expect(livro.category).to.equal("Ficção")
                    expect(livro.author).to.equal("Paulo Coelho")
               })
          });
     });

     // Objetivo: Validar que é possível obter detalhes de um livro específico pelo ID
     // Verificar que todos os campos do livro são retornados corretamente
     it('GET - Deve obter detalhes de um livro específico', () => {
             cy.api({
               method: 'GET',
               url: 'books/10'
           
          }).should(response => {
            expect(response.status).equal(200)

            expect(response.body.book.id).equal(10)
            expect(response.body.book.title).equal('Harry Potter e a Pedra Filosofal')
            expect(response.body.book.author).to.include('Rowling')
            expect(response.body.book.editor).equal('Editora Rocco')
            expect(response.body.book.category).equal('Fantasia')
            expect(response.body.book.language).equal('Português')
            expect(response.body.book.publication_year).equal(2008)
            expect(response.body.book.pages).equal(256)
            expect(response.body.book.format).equal('Físico')
            expect(response.body.book.description).to.include('Harry Potter')            
     
          });
     });

     // Objetivo: Validar que um novo livro é adicionado com sucesso ao catálogo
     // Verificar que apenas admin pode adicionar novos livros (validação de permissão)
     it('POST - Deve cadastrar um novo livro com sucesso', () => {
          //TODO: 
     });

     // Objetivo: Garantir que dados inválidos são rejeitados ao adicionar um livro
     // Validar mensagens de erro apropriadas para dados faltantes ou incorretos
     it('POST -  Deve rejeitar livro com dados inválidos', () => {
          //TODO: 
     });

     // Objetivo: Validar que um livro pode ser atualizado com sucesso
     // Verificar que apenas admin pode atualizar livros (validação de permissão)
     it('PUT - Deve atualizar um livro previamente cadastrado', () => {
          //TODO: 
     });

     // Objetivo: Validar que um livro pode ser removido do catálogo
     // Verificar que apenas admin pode deletar livros (validação de permissão)
     it('DELETE - Deve deletar um livro previamente cadastrado', () => {
          //TODO: 
     });
});