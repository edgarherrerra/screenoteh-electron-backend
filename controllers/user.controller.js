const User = require('../models/User')
exports.getUser = (req, res, next) => {
  const id = req.user._id
  User.findById(id).populate("categories")
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err }))
}