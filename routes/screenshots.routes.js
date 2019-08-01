const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary')
const { upload, getAllScreenshots, getOneScrenShoot } = require('../controllers/screnshoot.controller')
const { verifyToken } = require('../config/jwt')

router.post('/screenshots', uploadCloud.any(), upload);
router.get('/screenshots', verifyToken, getAllScreenshots);
router.get('/screenshots/:id', getOneScrenShoot)
module.exports = router;
