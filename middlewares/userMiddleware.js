const jwt = require('jsonwebtoken');

exports.authenticateToken=(req, res, next)=> {
  // console.log("middleware");
  const token = req.headers['authorization']
  console.log(token);
  if (token == null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user
    console.log(req.user);
    next()
  })
}