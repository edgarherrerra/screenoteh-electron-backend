const express = require('express');
const router  = express.Router();
// const uploadCloud = require('../config/cloudinary')
// const { upload, getAllScreenshots } = require('../controllers/screnshoot.controller')
// const { verifyToken } = require('../config/jwt')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// router.post('/screenshots', uploadCloud.any(), upload);
// router.get('/screenshots', verifyToken, getAllScreenshots);

module.exports = router;
