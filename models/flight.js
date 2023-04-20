import mongoose from "mongoose"
import { Meal } from "./meal.js"

const Schema = mongoose.Schema

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  },
  meal: {
    type: Schema.Types.ObjectID,
    ref: 'Meal',
  }
})

const flightSchema = new mongoose.Schema({
  airline: {
    type: String, 
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs:{
    type: Date,
    default: function() {
      return new Date(new Date().setFullYear(new Date().getFullYear()+1))
    }
  },
  tickets: [ticketSchema],
  mealOptions: [{
    type: Schema.Types.ObjectID,
    ref: 'Meal'
  }]
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight 
}