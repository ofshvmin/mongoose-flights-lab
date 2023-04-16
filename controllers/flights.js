import { Flight } from '../models/flight.js'


// GET localhost:3000/
function index(req, res) {
  res.render('flights/index', {
    title: "Flights"
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