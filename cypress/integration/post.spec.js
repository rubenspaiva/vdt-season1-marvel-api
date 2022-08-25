describe('POST /characters', () => {
    it('deve cadastrar um personagem', () => {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escalarte',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character).then(function (response) {
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    it.only('não deve cadastrar um personagem sem um dado obrigatório', () => {
        const failedCharacters = [{
            alias: 'Capitão América',
            team: ['Vingadores'],
            active: true
        },
        {
            name: 'Steve Rogers',
            team: ['Vingadores'],
            active: true
        },
        {
            name: 'Steve Rogers',
            alias: 'Capitão América',
            active: true
        },
        {
            name: 'Steve Rogers',
            alias: 'Capitão América',
            team: ['Vingadores'],
        },
    ]
    failedCharacters.forEach(function (c) {
        cy.postCharacter(c).then(function (response) {
            expect(response.status).to.eql(400)
            expect(response.body.validation.body.message)
            .to.match(/\"name\" is required|\"alias\" is required|\"team\" is required|\"active\" is required/i)
        })
    })
})

    context('quando o personagem já existe', function () {
        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercúrio',
            team: ['Vingadores da Costa Oeste', 'Irmandade de Mutantes'],
            active: true
        }
        before(() => {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })
        it('não deve cadastrar duplicado', () => {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })
})