const bcrypt = require('bcryptjs');
const xss = require('xss');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const  userService = { 
  hasUserWithUserName(db, user_name) {
    return db('fitpad_users')
      .where({user_name})
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('fitpad_users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if(password.startsWith(" ") || password.endsWith(" ")) {
      return 'Password must start with empty spaces or end with empty spaces'
    }
    if (password.length < 8) {
      return 'Password must be longer than 8 characters'
    }
    if(password.lenght >  72) {
      return 'Password cant be more than 72 characters'
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one uppercase, lowercase, and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  getAllUsers(db) {
    return db
      .from('fitpad_users').select('*');
  },
  getById(db, id){
    return db 
      .from('fitpad_users')
      .select('*')
      .where({id})
      .first();
  },
  deleteUser(db, id) {
    return db
      .from('fitpad_users')
      .select("*")
      .where({id})
      .delete()
  },
  serializeUser(user) {
    return {
      id: user.id,
      full_name: xss(user.full_name),
      user_name: xss(user.user_name),
      user_email: xss(user.user_email),
      date_created: new Date(user.date_created)
    };
  },
  updateUser(db,id,newUserFields) {
    return db
      .from('fitpad_users')
      .where({id})
      .update(newUserFields);
  }
};

module.exports = userService;