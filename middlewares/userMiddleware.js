const jwt = require('jsonwebtoken');

exports.authenticateToken=(req, res, next)=> {
  if (!req.headers || !req.headers['authorization']) {
    res.statusCode = 403;
    res.json({ error: "Missing JWT token from the 'Authorization' header" });
  } 
  else{
    const token = req.headers['authorization']

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err){
        res.statusCode = 403;
        res.json({ error: "Wrong JWT token" }); 
      }
      req.user = user
      next();
    })
  }
}