const { Verifier } = require('@pact-foundation/pact')

const { app } = require('../../server')


describe('Pact Verification', () => {
    let server
    beforeAll(() => {
        console.log('Starting Provicer Service For Testing')
        server = app.listen(8080)
    })

    it('Should meet the terms of the pact', async () => {
        const opts = {
            provider: 'Demo API Node JS Provider',
            providerBaseUrl: 'http://localhost:8080',
            pactBrokerUrl: 'http://localhost:9292',
            publishVerificationResult: true,
            providerVersion: '2.0.0',
        }
        const result = await (new Verifier()).verifyProvider(opts)
        console.log(result)
    })

    afterAll(() => {
        console.log('Testing Completem, Stopping Provider Service')
        server.close()
    })
})
