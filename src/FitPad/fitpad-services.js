const FitpadServices = {
  insertWorkout(db, newWorkout) {
    return db
      .insert(newWorkout)
      .into('workouts')
      .returning('*')
      .then(rows =>{ 
        return rows[0]
      })
  },
  updateWorkout(db, id, newWorkout) {
    return db('workouts')
      .where({id})
      .update(newWorkout)
  },
  getAllWorkouts(db) {
    return db
      .select('*')
      .from('workouts')
  },
  getAllWorkoutsByUserId(db, user_id) {
    return db
      .select('*')
      .from('workouts')
      .where('user_id', user_id)
  },
  getById(db, id) {
    return db
      .from('workouts')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteWorkout(db, id) {
    return db('workouts')
      .where({id})
      .delete()
  },
  // serializeWorkouts(workouts) {
  //   return {
  //     id: workouts.id,
  //     exercise_name: xss(workouts.exercise_name),
  //     workout_set: xss(workouts.workout_set),
  //     workout_rep: xss(workouts.workout_rep),
  //     workout_weight: xss(workouts.workout_weight),
  //     notes: xss(workouts.notes),
  //     date_added: xss(workouts.date_created)
  //   }
  // }
}

module.exports = FitpadServices;