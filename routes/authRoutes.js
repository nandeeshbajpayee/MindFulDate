const express = require('express');
const router = express.Router();
const {upload} = require('../config/handleUpload');
const authController = require('../controller/authController');

router.get('/signup', (req, res) => {  res.render('signup.ejs');  });

router.get('/login', (req, res) => {   res.send("hello")});

router.get('/logout', authController.logout);

router.post('/login', authController.login);

router.post('/register',upload.single("profilePhoto"), authController.register);

module.exports = router;
