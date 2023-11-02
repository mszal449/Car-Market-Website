require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connectDB')

// express app
const express = require('express')
const app = express()

// middleware import 
const notFoundMiddleware = require('./middleware/not-found')
const errorhandlerMiddleware= require('./middleware/error-handler')
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routers/authRouter.js')
const jobsRouter = require('./routers/carRouter.js')

app.use(express.json());


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// middleware
app.use(notFoundMiddleware)
app.use(errorhandlerMiddleware)



const PORT = process.env.PORT || 3000

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log('Connected to database')
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

start()