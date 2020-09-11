const axios = require('axios')

const PROVIDER_URL = 'http://localhost:8080'

const processData = (data) => {
    console.log(`Processing Data: ${JSON.stringify(data, null, 2)}`)
    return {
        ...data,
        hasConsumerProcessed: true,
        processedDate: new Date().toISOString()
    }
}

const handler = async () => {
    console.log(`Fetching Data from ${PROVIDER_URL}`)

    try {
        const { data } = await axios.get(PROVIDER_URL)

        console.log(data)
        const processedData = processData(data)

        console.log(processedData)
        return processedData
    } catch (err) {
        console.log(err)
    }
}

module.exports = { handler }
