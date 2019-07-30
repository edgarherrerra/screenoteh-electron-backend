const { model, Schema } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    username: String,
    email: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = model('User', userSchema)