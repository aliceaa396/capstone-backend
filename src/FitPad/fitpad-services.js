

const FitpadServices = {
  insertWorkout(db, workout){
    return db('fitpad_workouts')
      .insert(workout)
      .returning('*')
      .then(([workout]) => workout);
  }
}

module.exports= FitpadServices;