const express = require('express');
const path = require('path');

const jsonBodyParser = express.json();
const usersRouter = express.Router();
const UsersService = require('./user-service');
const jwt = require('../Middleware/jwt-auth')

usersRouter
  .route('/')
  .get((req,res,next) => {
    UsersService.getAllUsers(req.app.get('db'))
      .then(users => {
        res.json(users.map(UsersService.serializeUser));
      })
      .catch(next)
  })
  .post(jsonBodyParser, (req, res, next)=> {
    const {full_name,user_name,user_email,password} = req.body;
    const newUser = {full_name, user_name, user_email, password}
    for (const[key, value] of Object.entries(newUser)) {
      if(!value) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }
    const passwordError = UsersService.validatePassword(password)

    if (passwordError){
      return res.status(400).json({error: passwordError});
    }
    
    UsersService.hasUserWithUserName(req.app.get('db'),user_name)
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({error: `Username already taken`});

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              full_name,
              user_name,
              user_email,
              password: hashedPassword,
              date_created: 'now()'
            };
            return UsersService.insertUser(req.app.get('db'),newUser)
              .then (user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });

  usersRouter
    .route('/home')
    .all(jwt)
    .get((req,res) =>{
      return res.json({full_name: req.user.full_name})
    })


  usersRouter
    .route('/:user_id')
    .all((req, res, next) => {
      UsersService.getById(req.app.get('db'), req.params.user_id)
        .then(user => {
          if (!user) {
            return res.status(404).json({
              error: {message: 'User does not exist'}
            });
          }
          res.user= user;
          next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(UsersService.serializeUser(res.user));
    })
    .delete((req, res, next) => {
      UsersService.deleteUser(req.app.get('db'), req.params.user_id)
        .then(numRowsAffected => {
          res.status(204).end();
        })
        .catch(next);
    })
    .patch(jsonBodyParser, (req, res, next) => {
      const {full_name,user_name,user_email,password} = req.body;
      const userToUpdate={full_name,user_name, user_email,password};

      const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: "Request body must contain either 'full name', 'user name', 'user email' or 'password'"
          }
        });
      UsersService.updateUser(req.app.get('db'), req.params.user_id, userToUpdate)
        .then(numRowsAffected => {
          res.status(204).end();
        })
        .catch(next)
    });


module.exports = usersRouter;