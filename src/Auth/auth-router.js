const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post('/login', jsonBodyParser, (req,res,next) => {
  const{user_email, password} = req.body;
  const loginUser = {user_email, password};

  // for(const[key, value] of Object.entries(loginUser))
  //   if(!value) {
  //     return res.status(400).json({
  //       error: `Missing '${key}' in request body`
  //     });
  //  }
   AuthService.getUserWithUserEmail(req.app.get('db'), loginUser.user_email)
    .then(dbUser => {
      console.log(dbUser);
      if (!dbUser){
        return res.status(400).json({
          error:'Incorrect user email or password'
        });
      } 
      // return AuthService.comparePasswords(
      //   loginUser.password,
      //   dbUser.password
      // ).then(compareMatch => {
      //   if(!compareMatch) {
      //     return res.status(400).json({
      //       error: 'Incorrect user email or password'
      //     });
      //   }
      if (password === loginUser.password) {
        const sub = dbUser.user_email;
        const payload = {user_id: dbUser.id};
        res.send({
          authToken: AuthService.createJwt(sub,payload)
        });
      } else {
        res.send('passwords didnt match')
      }
        
      // });
    })
    .catch(next);
});

module.exports = authRouter;