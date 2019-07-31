const Screenshots = require('../models/Screenshots')
const Categories = require('../models/Categories')
const User = require('../models/User')
exports.upload = async (req, res) => {
  let files = req.files
  for (let i = 0; i < files.length; i++) {
    try {
      const screenshot = await Screenshots.create({ images: files[i].url })
      await Categories.findOneAndUpdate({ categorie: "Get Started" }, { $push: { screenshots: screenshot._id } }, { new: true })
      res.status(201).json({ images: screenshot })
    }
    catch (err) {
      res.status(500).json({ err })
    }
  }
}

exports.getAllScreenshots = (req, res, next) => {
  const id = req.user._id
  User.find(id).populate({path: "categories", populate: {path: "screenshots"}})
    .then(response => res.status(200).json({ response }))
    .catch(err => res.status(500).json({ err }))
}