// LISTING BROWSING CONTROLLER
const Listing = require('../models/Listing')
const { StatusCodes } = require('http-status-codes')


const browseListings = async (req,res) => {
    // create formatted query object
    const {
        listingType,
        brand,
        model,
        generation,
        sort,
        numericFilters,
        fields
    } = req.query

    const queryObject = {}

    if (listingType) queryObject.listingType = listingType;
    if (brand) queryObject.brand = { $regex: brand, $options: 'i' };
    if (model) queryObject.model = { $regex: model, $options: 'i' };
    if (generation) queryObject.generation = { $regex: generation, $options: 'i' };
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'year', 'mileage'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }


    // get respobnse
    let result = Listing.find(queryObject)

    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }
    
    // select fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // execute query
    const listings = await result;
    res.status(StatusCodes.OK).json({ listings, nbHits: listings.length });
}


module.exports = {
    browseListings,
};