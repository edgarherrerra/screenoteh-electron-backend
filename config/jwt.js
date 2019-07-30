const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signToken = user => {
  return jwt
    .sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.SECRET,
      { expiresIn: '72h' }
    )
    .split('.')
}

exports.verifyToken = (req, res, next) => {
  const { headload, signature } = req.cookies
  if (!headload && !signature) return res.status(401).json({ message: 'Unauthorized Missing token' })
  jwt.verify(`${headload}${signature}`, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json(err)
    User.findById(decoded.userId)
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => {
        res.status(401).json(err)
        next()
      })
  })
}