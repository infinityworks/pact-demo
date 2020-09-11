const axios = require('axios')

import { ProcessedRecord, UnprocessedRecord } from './interfaces/Records'

const PROVIDER_URL = 'http://localhost:8080'

const processData = (data: UnprocessedRecord): ProcessedRecord => {
    console.log(`Processing Data: ${JSON.stringify(data, null, 2)}`)
    return {
        ...data,
        hasConsumerProcessed: true,
        processedDate: new Date().toISOString()
    }
}

const handler = async () : Promise<ProcessedRecord> => {
    console.log(`Fetching Data from ${PROVIDER_URL}`)

    const { data } = await axios.get(PROVIDER_URL)

    console.log(data)
    const processedData = processData(data)

    console.log(processedData)
    return processedData
}

export {
    handler
}
