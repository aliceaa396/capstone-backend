const express = require ('express')
const fitpadrouter = express.Router()
const jsonbodyparser = express.json()
const FitpadServices = require('./fitpad-services')

fitpadrouter.post('/',jsonbodyparser, (req,res) =>{
  console.log (req.body)
  let workout = {
    exercise _name: req.body.exercise_name,
    workout_set: req.body.workout_set,
    workout_weight: req.body.workout_weight,
    user_id: 1, 
    notes: req.body.notes
  }
  FitpadServices.insertWorkout(req.app.get('db'), workout)
  .then(workout => {
    res
      .status(201)
      .json({workout})
  })
  .catch()
})

module.exports = fitpadrouter