CREATE TABLE exercise_sets (
  exercise_id INTEGER REFERENCES exercise(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  workout_set INTEGER NOT NULL,
  workout_rep INTEGER NOT NULL,
  workout_weight INTEGER NOT NULL,
);