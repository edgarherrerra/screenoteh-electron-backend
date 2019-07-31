const { Schema, model } = require('mongoose')

const CommentsSchema = new Schema({
  comment: String,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
},
  {
    timestamps: true,
    versionKey: false
  })

module.exports = model('Comments', CommentsSchema)