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
  }
}

module.exports = FitpadServices;