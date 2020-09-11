interface UnprocessedRecord {
    id: string
    description: string
}

interface ProcessedRecord extends UnprocessedRecord {
    hasConsumerProcessed: boolean
    processedDate: string
}

export {
    UnprocessedRecord,
    ProcessedRecord,
}
