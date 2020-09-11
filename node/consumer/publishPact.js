const { Publisher } = require('@pact-foundation/pact-node')

const publishPact = (pactFileDir, consumerVersion, tags) => {
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

module.exports = {
    publishPact
}
