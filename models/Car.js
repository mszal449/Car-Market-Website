const mongoose = require('mongoose')

// Possible financing options for the car model
const financingOptions = [
  'none',
  'bank loan',
  'lease',
  'auto loan',
  'personal loan',
  'dealer financing',
  'credit card',
  'cash payment',
  'hire purchase',
]

const fuelTypes = [
  'petrol',
  'petrol+lpg',
  'petrol+hybrid',
  'petrol+hybrid+lpg',
  'diesel',
]

const ListingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['private', 'company'],
    required: [true, 'Please provide listing type'],
  },
  price: {
    type: Number,
    required: true,
  },
  financingOptions: {
    type: String,
    enum: financingOptions,
    message: 'Please provide financing options',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})

const CarSchema = new mongoose.Schema({
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

const FinalSchema = new mongoose.Schema({
  car: CarSchema,
  listing: ListingSchema,
});

module.exports = mongoose.model('Car', FinalSchema);