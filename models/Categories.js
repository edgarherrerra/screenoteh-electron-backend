const { Schema, model } = require('mongoose')

const CategoriesSchema = new Schema({
  categorie: {
    type: String,
    default: "Get Started"
  },
  screenshots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Screenshots"
    }
  ]
},
  {
    timestamps: true,
    versionKey: false
  })

module.exports = model('Categories', CategoriesSchema)