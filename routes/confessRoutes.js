const express = require('express');
const router = express.Router();
const confessController = require('../controller/confessController');

// Routes
router.post('/', confessController.addConfess);
router.get('/', confessController.getAllConfesses);
router.post('/by_me', confessController.getConfessesByUserId);
router.post('/for_me', confessController.getConfessesForUserId);

module.exports = router;
