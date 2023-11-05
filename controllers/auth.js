// AUTHENTICATION ROUTES CONTROLLER
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError } = require('../errors')


// register new account
const register = async (req, res) => {
    console.log(req.body)
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user : {name : user.name}, token})
}


// login into existing account
const login = async(req, res) => {
    const {email, password} = req.body

    // check if data is complete
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    // check if account exists
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Wrong credentials provided')
    }
    console.log('user found')

    // check if password is correct
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Wrong credentials provided')
    }

    // create new token and return it with username
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}


module.exports = {
    register,
    login
}