const { Schema, model } = require('mongoose')

const ScreenshootSchema = new Schema({
  images: [String]
},
{
  timestamps: true,
  versionKey: false
})

module.exports = model('Screenshots', ScreenshootSchema)