const { Pact } = require('@pact-foundation/pact');
const { somethingLike: like } = require('@pact-foundation/pact').Matchers
const { publishPact } = require('../../publishPact')
const { handler } = require('../../index');
const path = require('path')

const consumerName = 'Demo API Node JS Consumer'
const providerName = 'Demo API Node JS Provider'
const pactDir = path.resolve(process.cwd(), 'pacts')

const provider = new Pact({
    consumer: consumerName,
    provider: providerName,
    port: 8080,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: pactDir,
    logLevel: 'DEBUG',
    spec: 2,
})

describe('Pact with our provider', () => {
    beforeAll(async () => {
        await provider.setup()
    })

    describe('When a call to the provider is made', () => {
        let consumerResult

        beforeAll(async () => {
            await provider.addInteraction({
                uponReceiving: 'a request for JSON data',
                withRequest: {
                    method: 'GET',
                    path: '/',
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: {
                        id: like('d30a7995-1bd2-4940-b7b5-59e69fc122da'),
                        description: like('some arbitrary text')
                    },
                }
            })

            consumerResult = await handler()
        })

        it('Can produce an object with addtional processed data', async () => {
            expect(consumerResult).toMatchObject({
                processedDate: expect.stringMatching(
                    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
                ),
                hasConsumerProcessed: true
            })
        })

        it('should validate the interactions and create a contract', async () => {
            await provider.verify()
        })
    })

      // Write pact files to file
    afterAll(async () => {
        await provider.finalize()
        await publishPact(pactDir, '1.0.0', ['demo'])
    })
})
