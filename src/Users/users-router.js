const express = require('express');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./user-service');
const path = require('path');


usersRouter.post('/', jsonBodyParser, (req, res)=> {
  const {user_name,first_name, last_name, user_email, password} = req.body;

  for(const field of ['user_name','first_name','last_name','user_email','password']) {
    if(!req.body[field]){
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
    }
  }
  const passwordError = UsersService.validatePassword(password)

  if (passwordError){
    return res.status(400).json({error: passwordError});
  }

  UsersService.hasUserWithUserName(req.app.get('db'),user_name)
    .then(hasUserWithUserName => {
      if(hasUserWithUserName)
        return res.status(400).json({error: `Username already taken`});

      return UsersService.hashPassword(password)
        .then(hashedPassword => {
          const newUser = {
            user_name,
            user_email,
            password: hashedPassword,
            first_name,
            last_name,
            date_created: 'now()'
          };

          return UsersService.insertUser(req.app.get('db'),newUser)
            .then(
              user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              }
            );
        });
    })
    .catch(next);
});


// usersRouter.post('/register', jsonBodyParser, (req, res) => {
//   console.log(req.body)
// })


module.exports = usersRouter;