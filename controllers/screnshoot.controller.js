const Screenshots = require('../models/Screenshots')
const Categories = require('../models/Categories')
const User = require('../models/User')
const axios = require('axios')
const FormData = require('form-data');
const form = new FormData();
const os = require('os');

exports.upload = async (req, res) => {
  let files = req.files
  console.log(files)
  try {
    for (let i = 0; i < files.length; i++) {
      const screenshot = await Screenshots.create({ images: files[i].url })
      await Categories.findOneAndUpdate({ categorie: "🏁 Get Started" }, { $push: { screenshots: screenshot._id } }, { new: true })
      res.status(201).json({ images: screenshot, msg: 'Entra' })
    }
  }
  catch (err) {
    res.status(500).json({ err })
  }
}

exports.getAllScreenshots = (req, res, next) => {
  const id = req.user._id

  const desktopPath = `${os.userInfo().homedir}/Desktop`;
  const fs = require('fs');
  const nameEn = 'Screen'

  let screenShoots = fs.readdirSync(desktopPath).filter((file) => {

    return file.indexOf(nameEn) !== -1;
  })

  let fullFilePath = []
  for (var i = 0; i < screenShoots.length; i++) {
    fullFilePath.push(`${desktopPath}/${screenShoots[i]}`)
    console.log(fullFilePath)
  }

  const appendScreenshots = () => {
    return new Promise((resolve, reject) => {
      if (fullFilePath.length === 0) return reject(new Error("No hay contenido"))
      fullFilePath.forEach((url, i) => {
        fs.readFile(url, (err, imageData) => {
          if (err) {
            console.log(err)
          }
          form.append(`file${i}`, imageData, {
            filepath: url,
            contentType: 'multipart/form-data'
          })

          if (i == fullFilePath.length - 1) {
            resolve()
          }
        })
      })
    })
  }

  appendScreenshots().then(() => {
    axios.post('http://localhost:3000/screenshots', form, {
      headers: form.getHeaders(),
    }).then(response => {
      User.find(id).populate({ path: "categories", populate: { path: "screenshots" } })
        .then(response => res.status(200).json({ response }))
        .catch(err => res.status(500).json({ err }))
    }).catch(err => {
      console.log(err);
    })
  })
}