const express = require ('express');
const fitpadRouter = express.Router()
const jsonBodyParser = express.json()
const FitpadServices = require('./fitpad-services');
const requireAuth = require('../Middleware/jwt-auth');


const serializeWorkout = workout => ({
  id: workout.id,
  exercise_name: workout.exercise_name,
  workout_set: workout.workout_set,
  workout_rep: workout.workout_rep,
  workout_weight: workout.workout_weight,
  notes: workout.notes
})

fitpadRouter
  .route('/')
  .all(requireAuth)          
  .get((req, res, next) => {
    FitpadServices.getAllWorkoutsByUserId(req.app.get('db'), req.user.id )
      .then(workouts => {
        res.json(workouts.map(serializeWorkout))
        
      })
      .catch(next);
  })
  
  .post(jsonBodyParser,(req,res,next) => {
    const {exercise_name,workout_set,workout_rep, workout_weight,notes}=req.body

    const newWorkout = {user_id: req.user.id, exercise_name, workout_set, workout_rep, workout_weight, notes}

    FitpadServices.insertWorkout(
      req.app.get('db'),
      newWorkout
    )
    .then(workout => {
      return res
        .status(201)
        .json(serializeWorkout(workout))
    })
    .catch(next)
  })

  fitpadRouter
    .route('/:id')
    .all((req, res, next) => {
      const {id}=req.params
      FitpadServices.getById(
        req.app.get('db'),
        req.params.id
      )
      .then(workout => {
        if (!workout) {
          return res.status(404).json({
            error: {message: `Workout ${id} Not Found`}
          })
        }
        res.workout= workout
        next()
      })
      .catch(next) 
    })
    .get((req, res, next) => {
      res.json(serializeWorkout(res.workout))
    })
    .delete((req,res,next) => {
      const {id} = req.params
      FitpadServices.deleteWorkout(req.app.get('db'),id)
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
    .patch (jsonBodyParser, (req, res, next) => {
      const {exercise_name,workout_set,workout_rep, workout_weight,notes}=req.body
      const updateWorkout = {exercise_name,workout_set,workout_rep, workout_weight,notes}

      const numberOfValues = Object.values(updateWorkout).filter(Boolean).length
        if(numberOfValues === 0){
          return res.status(400).json({
            error: {message: `request body must contain either 'exercise name', 'workout set', 'workout rep' 'workout weight' or 'notes'`}
          })
        }
        FitpadServices.updateWorkout(
          req.app.get('db'),
          req.params.id,
          updateWorkout
        )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
 


module.exports = fitpadRouter;