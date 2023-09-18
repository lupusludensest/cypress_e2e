let url = "https://cms-dev-v3.neuro.net";

describe('To get token', () => {

    console.log(url);

    const login = 'test_cypress@neuro.net';
    const password = 'test_cypresS6';
    let token = '';
    let agent_uuid = '';
    console.log(url);

    it('To get token', () => {
        // To get token

        cy.request({
            method: 'POST',
            url: `${url}/api/v2/ext/auth`,
            auth: {
                username: login, password: password,
            },
        })

            .then(responce => {

                cy.log(JSON.stringify(responce));
                cy.log(responce.body.token);
                token = responce.body.token;
                cy.log(responce.body.agent_uuid);
                agent_uuid = responce.body.agent_uuid;
            });
    })

    describe('Update Agent Neuro Dev', () => {

        console.log(url);

        it('Update Agent Neuro Dev', () => {

            // Actual
            cy.request({
                method: 'PUT',
                url: `${url}/api/v2/ext/agent-settings/general?agent_uuid=d022c7b5-017c-4a45-a439-88331082e80e`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: {
                    'recall_count': 12345678
                }

                // Expected
            }).then((res) => {

                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(200)
                expect(res.body).has.property('recall_count', 12345678)
                expect(res.body).has.property('language', 'en-US')
                expect(res.body).has.property('company_uuid', '988aef0a-7467-48e4-a4a9-2193da260718')
                expect(res.body).has.property('flag', 'test_one')
            })
        })
    })
})

