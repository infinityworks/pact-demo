const { Publisher } = require('@pact-foundation/pact-node')

const publishPact = (pactFileDir: string, consumerVersion: string, tags: Array<string>) => {
    let opts = {
        pactBroker: 'localhost:9292',
        pactFilesOrDirs: [pactFileDir],
        pactBrokerToken: '',
        consumerVersion,
        tags,
        publishVerificationResult: true,
    }

    const publisher = new Publisher(opts)

    return publisher.publish()
}

export {
    publishPact
}
