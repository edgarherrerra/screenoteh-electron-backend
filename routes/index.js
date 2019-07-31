const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/jwt')
const { getUser } = require('../controllers/user.controller')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/user', verifyToken, getUser)

// router.post('/screenshots', uploadCloud.any(), upload);
// router.get('/screenshots', verifyToken, getAllScreenshots);

module.exports = router;
