// PRODUCT MENAGEMENT ROUTES CONTROLLER
const Listing = require('../models/Listing')
const { statusCodes, StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllListings = async (req, res) => {
    const listings = await Listing.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(200).json({ listings, count : listings.length})
}

const getListing = async (req, res) => {
    const {
        user : { userId },
        params: { id: listingId }
    } = req

    const listing = await Listing.findOne({
        _id: listingId,
        createdBy: userId
    })

    if(!listing) {
        throw new NotFoundError(`No listing with id ${listingId} found`)
    }
    res.status(StatusCodes.OK).json({ listing })
}

const addListing = async (req, res) => {
    req.body.createdBy = req.user.userId
    const listing = await Listing.create(req.body)
    res.status(StatusCodes.CREATED).json({ listing })
}

const updateListing = async (req, res) => {
    const {
        body : {
            listingType,
            price,
            brand,
            model,
            year,
            generation,
            mileage
        },
        user: { userId },
        params: { id: listingId}
    } = req

    if (!listingType|| 
        !price || 
        !brand ||
        !model ||
        !year ||
        !generation ||
        !mileage) {
            throw new BadRequestError('No field can be empty')
        }
    const listing = await Listing.findByIdAndUpdate(
        {
            _id : listingId,
            craetedBy: userId
        },
        req.body,
        { new: true, runValidators: true }
    )
    if(!listing) {
        
    }
}


const deleteListing = async (req, res) => {
    const {
        user: { userId },
        params: { id: listingId },
    } = req

    const listing = await Listing.findByIdAndRemove({
        _id: listingId,
        createdBy: userId,
    })
    if (!listing){
        throw new NotFoundError(`No listing found with id ${listingId}`)
    }

    res.status(StatusCodes.NOT_FOUND).send()
}

module.exports = {
    getAllListings,
    getListing,
    addListing,
    updateListing,
    deleteListing
}