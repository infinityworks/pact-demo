const express = require('express')
const uuid = require('uuid')
const app = express()

app.get('/', (req, res) => {
    console.log('GET request Recieved')
    const response = {
        id: uuid(),
        description: "some data that the Provider API is giving to the Consumer"
    }
    res.json(response)
})

module.exports = { app }
