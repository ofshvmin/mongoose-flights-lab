import { Meal } from '../models/meal.js'

function index(req, res) {
  res.render('meals/new', {
    title: "Add Meal"
  })
}

function create(req, res) {
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals')
  })
}


export {
  index,
  create
}