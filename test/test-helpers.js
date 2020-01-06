const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      full_name: 'test user',
      user_name: 'test-user-1',
      user_email: 'testuser1@aol.com',
      password: 'Password1?',
      date_created: new Date('2020-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      full_name: 'user test',
      user_name: 'test-user-2',
      user_email: 'testuser2@aol.com',
      password: 'Password1?',
      date_created: new Date('2020-01-22T16:28:32.615Z')
    },
    {
      id: 3,
      full_name: 'testy user',
      user_name: 'test-user-3',
      user_email: 'testuser3@aol.com',
      password: 'Password1?',
      date_created: new Date('2020-01-22T16:28:32.615Z')
    }
  ]
}

function makeWorkoutsArray(users) {
  return [
    {
      id: 1,
      exercise_name: 'Flat BarBell Bench Press',
      workout_set: 1, 
      workout_rep: 6,
      workout_weight:225,
      notes: 'need to work on form'
    },
    {
      id: 2,
      exercise_name: 'Incline BarBell Bench Press',
      workout_set: 2, 
      workout_rep: 8,
      workout_weight:205,
      notes: 'need to work on depth'
    },
    {
      id: 3,
      exercise_name: '21 Cross Over Flys',
      workout_set: 3, 
      workout_rep: 12,
      workout_weight:25,
      notes: 'need to work on decentric aspect of the movement'
    }
  ]
}
function cleanTables (db) {
  return db.transaction(trx => 
    trx
      .raw(`TRUNCATE fitpad_users`)
      .then(()=> 
        Promise.all([trx.raw(`SELECT setval('fitpad_users_id_seq`, 1)])
      ) 
  )
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into('fitpad_users')
    .insert(preppedUsers)
    .then(() => 
      db.raw(`SELECT setval('fitpad_users_id_seq',?)`,[
        users[users.length -1].id
      ])
    );
}

module.exports = {
  makeUsersArray,
  makeWorkoutsArray,
  cleanTables,
  seedUsers
}