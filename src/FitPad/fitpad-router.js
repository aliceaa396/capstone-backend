const express = require ('express');
const fitpadrouter = express.Router()
const jsonbodyparser = express.json()
const FitpadServices = require('./fitpad-services');
const requireAuth = require('../Middleware/jwt-auth');

fitpadrouter.post('/',jsonbodyparser,requireAuth, (req,res,next) => {
  console.log (req.body)
  let workout = {
    exercise_name: req.body.exercise_name,
    workout_set: req.body.workout_set,
    workout_weight: req.body.workout_weight,
    user_id: 1, 
    notes: req.body.notes
  }
  let newWorkout = {user_id,exercise_name,workout_set,workout_weight,notes}

  FitpadServices.insertWorkout(req.app.get('db'), newWorkout)
  .then(workout => {
    res
      .status(201)
      .json(serializeWorkou(workout))
  })
  .catch(next)
})

module.exports = fitpadrouter