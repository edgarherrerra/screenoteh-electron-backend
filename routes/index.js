const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary')
const { upload } = require('../controllers/screnshoot.controller')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.post('/screenshots', uploadCloud.any(), upload);

module.exports = router;
