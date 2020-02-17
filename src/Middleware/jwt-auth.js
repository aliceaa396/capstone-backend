const AuthService = require('../Auth/auth-service')

function requireAuth(req, res, next) {
  
  const authToken = req.get("Authorization") || "";

  console.log(authToken)

  let bearerToken;

  if (!authToken.toLowerCase().startsWith('bearer')) {
    return res.status(401).json({error:'Missing bearer token'}); 
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  try {
    const payload = AuthService.verifyJwt(bearerToken)
    AuthService.getUserWithUserEmail(
      req.app.get('db'),
      payload.sub,
    )
    .then(user => {
      console.log("logged-in user:", user);
      if(!user)
        return res.status(401).json({error:'Unathorized request'});
        req.user = user;
        next();
    })
    .catch(err => {
      console.error(err)
      next(err);
    });
  } catch (error) {
    res.status(401).json({error:'Unathorized request'});
  }
}

module.exports = requireAuth;