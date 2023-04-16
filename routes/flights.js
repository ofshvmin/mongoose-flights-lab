import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/flights
router.get('/', flightsCtrl.index)

// GET localhost:3000/flights/index
router.get('/index', flightsCtrl.index)

// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)


// PUT localhost:3000/flights
router.post('/', flightsCtrl.create)

export { router }
