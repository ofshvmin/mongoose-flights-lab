import { Flight } from '../models/flight.js'


// GET localhost:3000/
function index(req, res) {
  Flight.find({})
    .then(flights => {
    res.render('flights/index', {
      title: "Flights",
      flights: flights
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}  

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight"
    
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}



export {
  index,
  newFlight as new,
  create
}