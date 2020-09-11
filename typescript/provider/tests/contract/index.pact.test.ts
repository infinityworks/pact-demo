import { Verifier } from '@pact-foundation/pact'
import { app } from '../../server'

describe('Pact Verification', () => {
    let server: any = null

    beforeAll(() => {
        console.log('Starting Provicer Service For Testing')
        server = app.listen(8080)
    })

    it('Should meet the terms of the pact', async () => {
        const opts = {
            provider: 'Demo API Typescript Provider',
            providerBaseUrl: 'http://localhost:8080',
            pactBrokerUrl: 'http://localhost:9292',
            publishVerificationResult: true,
            providerVersion: '3.0.0',
        }
        const result = await (new Verifier()).verifyProvider(opts)
        console.log(result)
    })

    afterAll(() => {
        console.log('Testing Completem, Stopping Provider Service')
        server.close()
    })
})
