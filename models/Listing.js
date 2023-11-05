const mongoose = require('mongoose')

const fuelTypes = [
  'petrol',
  'petrol+lpg',
  'petrol+hybrid',
  'petrol+hybrid+lpg',
  'diesel',
]

const ListingSchema = new mongoose.Schema({
  listingType: {
    type: String,
    enum: ['private', 'company'],
    required: [true, 'Please provide listing type'],
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand'],
  },
  model: {
    type: String,
    required: [true, 'Please provide model'],
    maxLength: 50,
  },
  year: {
    type: Number,
    required: [true, 'Please provide year of production'],
  },
  generation: {
    type: String,
    required: [true, 'Please provide vehicle generation'],
  },
  mileage: {
    type: Number,
    required: [true, 'Please provide mileage'],
    min: 0,
  },
})


module.exports = mongoose.model('Listing', ListingSchema);