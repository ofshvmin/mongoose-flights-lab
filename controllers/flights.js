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
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  res.render('flights/new', {
    title: "Add Flight",
    departsDate
    
  })
}

function create(req, res) {
  console.log(req.body);
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
  Flight.findById(req.params.flightId)
  .then(flight => {
    console.log(flight)
    res.render('flights/show', {
      title: "Flight Details",
      flight,
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

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight=> {
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
  update,
  deleteFlight as delete
}