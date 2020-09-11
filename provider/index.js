
const { app } = require('./server')

const PORT = 8080
console.log(`Producer listening on Port ${PORT}`)
app.listen(PORT)