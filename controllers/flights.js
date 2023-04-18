import { Flight } from '../models/flight.js'


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
  .then(flight => {
    res.render('flights/show', {
      title: "Flight Details",
      flight,
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


// function experiment(req, res) { 
//   Flight.findById(req.params.flightId).then(flight => flight.tickets.forEach(ticket => {
    
//   if(ticket.id === req.params.ticketId) {
//     console.log(tickets.index)
//   } else {console.log('no match')}
  

  
//   } ) )}


  function experiment(req, res) { 
    Flight.findById(req.params.flightId).then(flight => {
        console.log(index);
        if(index !== -1) {
          flight.tickets.splice(flight.tickets.indexOf((req.params.ticketId)), 1)
          flight.save()
          res.redirect(`/flights/${flight._id}`)
        }
      })

    // if(ticket.id === req.params.ticketId) {
    //   console.log(tickets.index)
    // } else {console.log('no match')}
    
      
    } 

    // flight.tickets.forEach(ticket => {if(ticket._id === `new ObjectId("${req.params.ticketId}")`) {console.log('it matches')} })


    // const index = flight.tickets.findIndex(item => item._id === `new ObjectId("${req.params.ticketId}")`)
    
    
    // console.log(`new ObjectId("${req.params.ticketId}")`);

    // if(index !== -1) {
    //   flight.tickets.splice(index,1)
    // flight.save()
    // res.redirect(`/flights/${flight._id}`)
    // }
//   })
// }

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
  experiment
}