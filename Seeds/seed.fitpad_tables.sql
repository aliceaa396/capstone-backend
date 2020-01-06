BEGIN;

TRUNCATE 
  fitpad_users,
  workouts
  RESTART IDENTITY CASCADE;

INSERT INTO fitpad_users
  (full_name, user_name, user_email, password)
VALUES
  ('Angel Alicea','ala31996','angelalicea0@gmail.com','$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('Pearly Person','pp12345','pearlyperson@gmail.com','$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('Marc Guy','mGuy5','marcguy@gmail','$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne');


INSERT INTO workouts 
(exercise_name,workout_set, workout_rep, workout_weight, notes )

VALUES 
(
  'Flat Barbell Bench Press',
  1,
  6,
  225,
  'Went up by 5 pounds'
),
(
  'Incline Dumbell Bench Press',
  2,
  6,
  100,
  'Need to improve depth of movement'
),
(
  '21 Cross Over Cable Flys',
  1,
  12,
  20,
);

COMMIT;