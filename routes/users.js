const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const Controller = require('../app/controllers/user');
const moment = require('moment');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path =  global.appRoot + '/public/uploads/videos/' + moment().format('MM-YYYY');
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path)
  },
  filename: function (req, file, cb) {
    const datetime = moment();
    cb(null, datetime.format('DD-MM-YYYY') + '-' + datetime.unix() + '-' + file.originalname.replace(/\s/g, '-'))
  }
});
const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res) {
  console.log('register route');
  Controller.AuthController.register(req, res)
});

router.post('/video/create', upload.single('video'), function (req, res) {
  Controller.VideoController.create(req, res);
});

router.get('/video', function (req, res) {
  Controller.VideoController.index(req, res);
});

module.exports = router;
