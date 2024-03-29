const Category = require('../models/Categories')
const User = require('../models/User')

exports.createCategoryByDefault = async (req, res, next) => {
  const id = req.body.data.user._id
  try {
    const category = await Category.create({ ...req.body })
    await User.findByIdAndUpdate(id, { $push: { categories: category._id } }, { new: true })
    res.status(201).json({ category })
  }
  catch (err) {
    res.status(500).json({ err })
  }
}

exports.createCategory = async (req, res, next) => {
  const id = req.user._id
  try {
    const category = await Category.create({ ...req.body })
    await User.findByIdAndUpdate(id, { $push: { categories: category._id } }, { new: true })
    res.status(201).json({ category })
  }
  catch (err) {
    res.status(500).json({ err })
  }
}

exports.deleteOneCategory =  async (req, res, next) => {
  id = req.params.id
  try {
    const categoryDeleted = await Category.findByIdAndDelete(id)
    res.status(201).json({ categoryDeleted, msg: "Deleted!" })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// exports.getCategories = async (req, res, next) => {
//   const id = req.user._id
//   try {
//     const response = await User.find(id).populate({path: "categories"})
//     res.status(201).json({ response })
//   } catch (err) {
//     res.status(500).json({ err })
//   }
// }
