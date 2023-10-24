require('dotenv').config()
require('express-async-errors')

// express app
const express = require('express')
const app = express()

// error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorhandlerMiddleware= require('./middleware/error-handler')

// routes
app.get('/', (req, res) => {
    res.send('Car market website Api')
})


app.use(notFoundMiddleware)
app.use(errorhandlerMiddleware)


const PORT = process.env.PORT || 3000

const start = async() => {
    app.listen(process.env.PORT, () => console.log(`Server is listening  on port ${process.env.PORT}`))
}

start()