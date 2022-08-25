describe('DELETE /characters/id', () => {
    const character = {
        name: 'Jhonny Storm',
        alias: 'Tocha Hu,ama',
        team: ['Quarteto Fantástico'],
        active: true
    }

    context('quando eu tenho um personagem cadastrado', function () {

        before(() => {
            cy.postCharacter(character).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve remover o personagem pelo id', () => {
            const id = Cypress.env('characterId')
            cy.deleteCharactersById(id).then(function (response) {
                expect(response.status).to.eql(204)
            })
        })

        after(() => {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })

        it('deve retornar 404 ao remover por id não cadastrado', () => {
            const id = '62cf96d7aed38c1b46008c25'
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})