const Comments = require('../models/Comments')
const Screenshots = require('../models/Screenshots')

exports.createComment = async (req, res, next) => {
  const {id} = req.body
  console.log(id)
  try {
    const comment = await Comments.create({ ...req.body })
    await Screenshots.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { new: true })
    res.status(201).json({ comment })
  } catch (error) {
    res.status(500).json(error)
  }
}