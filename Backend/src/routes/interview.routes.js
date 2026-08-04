const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const fileMiddleware = require('../middlewares/file.middleware')

const interviewController= require('../controllers/interview.controller')

router.post('/', authMiddleware, fileMiddleware.single('resume'), interviewController.generateReport);

module.exports= router;
