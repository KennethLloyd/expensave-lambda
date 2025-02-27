const express = require('express');
const { userController } = require('../controllers');
const { userValidator } = require('../validators');

const router = new express.Router();

router.post('/auth/signUp', userValidator.signUp, userController.signUp);
router.post('/auth/logIn', userValidator.logIn, userController.logIn);

module.exports = router;
