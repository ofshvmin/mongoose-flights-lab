import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'


// GET localhost:3000/
function index(req, res) {
  Flight.find({})
    .then(flights => {
    res.render('flights/index', {
      title: "Flights",
      flights: flights.sort((a, b) => a.departs - b.departs)
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
  const localOffset = dt.getTimezoneOffset()
  dt.setMinutes(dt.getMinutes() - localOffset)
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
    res.redirect('/flights/invalid')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('mealOptions')
  .then(flight => {
    Meal.find({})
    .then(meals => {
      meals.forEach(meal => {
      })
      res.render('flights/show', {
        title: "Flight Details",
        flight,
        meals
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    const dt = flight.departs
    const localOffset = dt.getTimezoneOffset()
    dt.setMinutes(dt.getMinutes() - localOffset)
    const departsDate = dt.toISOString().slice(0, 16)
    res.render('flights/edit', {
      title: "Edit Flight",
      flight: flight,
      departsDate
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/invalid')
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.render('flights/show', {
      title: "Flight Details",
      flight,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/invalid')
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

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights/invalid')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/invalid')
  })
}

function invalid(req, res) {
  res.render('flights/invalid', {title: "Error"})
  }

function deleteTicket(req, res) { 
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.forEach((ticket, index) => {
      if(ticket.id === req.params.ticketId) {
        flight.tickets.splice(index, 1)
        flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
        .catch((error) => {
          console.log(error)
          res.redirect('flights/invalid')
        })
      }   
    })
  })
  .catch((error) => {
    console.log(error)
    res.redirect('flights/invalid')
  })
}

function updateTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.forEach((ticket) => {
      if(ticket.id === req.params.ticketId) {
        ticket.meal = req.body.mealId
        flight.save()
        .then(() => {
          res.redirect('/flights')      
        })
        .catch((error) => {
          console.log(error)
          res.redirect('flights/invalid')
        })
      }
    })
  })
  .catch((error) => {
    console.log(error)
    res.redirect('flights/invalid')
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  edit,
  update,
  deleteFlight as delete,
  createTicket,
  invalid,
  deleteTicket,
  updateTicket
}