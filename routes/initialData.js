const express = require('express');
// const { requireSignin, adminMiddleware } = require('../../common-middleware');
const { initialData } = require('../controllers/initialData');
const router = express.Router();


router.post('/initialdata', initialData);


module.exports = router;