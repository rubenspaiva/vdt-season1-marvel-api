describe('GET /characters', () => {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Perter Parker',
            alias: 'Homem-Aranha',
            team: ['Novos vingadores'],
            active: true
        }
    ]

    before(() => {
        cy.populateCharacters(characters)
    })
    it('deve retornar uma lista de personagens', () => {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', () => {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body).to.be.a('array')
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['X-men'])
            expect(response.body[0].active).to.eql(true)
        })
    })
})

describe('GET /characters/id', () => {
    const character = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['Vingadores'],
        active: true
    }

    context('quando eu tenho um personagem cadastrado', function () {

        before(() => {
            cy.postCharacter(character).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar o personagem pelo id', () => {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })

        it('deve retornar 404 ao buscar por id não cadastrado', () => {
            const id = '62cf96d7aed38c1b46008c25'
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})