const dataJson = require('..\\..\\fixtures\\createUser.json')

describe('Post User Request', () => {
    let accessToken = 'f8405b80efcb9447b7ff528cf3841f063fb565ff6218943db8b4f68864c3ba1a';
    let randomText = ""
    let testEmail = ""

    it('Create User Test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail =randomText + '@gmail.com'

        cy.fixture('createUser').then((payload) => {

        // Actual
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                    "name": payload.name,
                    "gender":payload.gender,
                    "email": testEmail,
                    "status": payload.status
            }

        // Expected
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name', payload.name)
            expect(res.body.data).has.property('status', payload.status)
            expect(res.body.data).has.property('gender', payload.gender)
        })
    })
 })
})