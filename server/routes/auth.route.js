const express = require('express')
const router = express.Router()

const { signUpPost, loginPost, forgotPost, validateUser, generateOTP } = require('../controllers/auth.controller')

router.route('/signup').post(signUpPost)
router.route('/login').post(loginPost)
router.route('/forgot-password').post(forgotPost)
router.route('/user/validate').get(validateUser).post(generateOTP)

module.exports = router 