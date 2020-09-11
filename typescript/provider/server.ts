import express from 'express'
import { v4 as uuid } from 'uuid';
const app = express()

app.get('/', (req, res) => {
    console.log('GET request Recieved')
    const response = {
        id: uuid(),
        description: "some data that the Provider API is giving to the Consumer"
    }
    res.json(response)
})

export {
    app
}
