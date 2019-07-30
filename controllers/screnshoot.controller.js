exports.upload = (req, res) => {
  let files = req.files
  let arrUrl = []
  for (let i = 0; i < files.length; i++) {
    arrUrl.push(files[i].url)
  }

  console.log(arrUrl)
  res.status(201).json({ images: arrUrl })
}