const { model, Schema } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    username: String,
    email: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categories"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = model('User', userSchema)