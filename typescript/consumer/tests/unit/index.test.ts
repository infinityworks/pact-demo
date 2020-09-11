
import axios from 'axios'
import { ProcessedRecord } from 'interfaces/Records'
import { handler } from '../../index'

const mockAxiosGet = jest.spyOn(axios, 'get')

beforeEach(() => {
    jest.resetAllMocks()
})

describe('when the provider gives valid data as a response', () => {
    let result: ProcessedRecord = null

    beforeEach(async () => {
        mockAxiosGet.mockResolvedValueOnce({
            data: {
                id: 'some-mocked-id-string',
                description: 'some-mock-description-string'
            }
        })
        result = await handler()
    })

    it('Should include that the data was processed in the handler response', () => {
        expect(result.hasConsumerProcessed).toEqual(true)
    })

    it('Should return the processed date in the handler response', () => {
        expect(result.processedDate).toMatch(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    })

    it('should return the original data i nthe handler response', () => {
        expect(result).toMatchObject({
            id: expect.any(String),
            description: expect.any(String),
        })
    })
})

describe('when the provder api responds with a 500 error', () => {
    let errorResult : Error = null

    beforeEach(async () => {
        mockAxiosGet.mockRejectedValueOnce(new Error('fake-api-error'))
        try {
            await handler()
        } catch (err) {
            errorResult = err
        }
    })

    it('should throw the error presented by axios', () => {
        expect(errorResult).toEqual(new Error('fake-api-error'))
    })
})
