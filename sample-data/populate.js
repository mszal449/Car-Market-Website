require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../db/connectDB')
const User = require('../models/User')


// get sample data
const users = require('./users_data.json')
const jsonUsers = users.users


const start = async () => {
    try {
        // connect to database
        await connectDB(process.env.MONGO_URI)
        console.log('Database conenction established')

        // clear database
        await User.deleteMany()

        // register users
        console.log('Registering users...')
        await User.create(jsonUsers)
        console.log('Users registered succesfuly')

        // Disconnect from database
        await mongoose.disconnect()
    } catch (error) {
        console.log(error)        
        process.exit(1)
    }
}

start()

