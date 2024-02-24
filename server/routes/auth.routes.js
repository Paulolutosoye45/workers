const express = require('express');
const { register, sigin, signout } = require('../controllers/auth.controllers');

const router = express.Router()


router.route('/signup').post(register)
router.route('/signin').post(sigin)
router.route('/signout/:id').post(signout)

module.exports= router;