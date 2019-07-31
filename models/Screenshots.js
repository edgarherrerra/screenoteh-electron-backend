const { Schema, model } = require('mongoose')

const ScreenshootSchema = new Schema({
  images: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }]
},
  {
    timestamps: true,
    versionKey: false
  })

module.exports = model('Screenshots', ScreenshootSchema)