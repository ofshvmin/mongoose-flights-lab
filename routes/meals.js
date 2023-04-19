import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()



// GET localhost:3000/meals
router.get('/', mealsCtrl.index)

// // GET localhost:3000/flights/index
// router.get('/index', flightsCtrl.index)

// // GET localhost:3000/flights/new
// router.get('/new', flightsCtrl.new)

// router.get('/invalid', flightsCtrl.invalid)


// // GET localhost:3000/flights/:flightId
// router.get('/:flightId', flightsCtrl.show)

// // GET localhost:3000/flights/:flightId/edit
// router.get('/:flightId/edit', flightsCtrl.edit)


// POST localhost:3000/flights
router.post('/', mealsCtrl.create)



// // PUT localhost:3000/flights/:flightId
// router.put('/:flightId', flightsCtrl.update)

// // DELETE localhost:3000/flights/:flightID
// router.delete('/:flightId', flightsCtrl.delete)

export { router }
