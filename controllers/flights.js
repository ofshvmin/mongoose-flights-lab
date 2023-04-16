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
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function show(req, res) {
  console.log('daaaaaaaaaaaaat body!!!!!!!!!', req.params)
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      title: "Flight Details",
      flight: flight
    })

  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/index')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      title: "Edit Flight",
      flight: flight
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/index')
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  edit,
  update
}