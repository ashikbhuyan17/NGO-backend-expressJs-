const express = require('express');
const router = express.Router();

const { signup, signIn } = require('../../controller/admin/auth');
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../../validators/auth');

router.post('/admin/signin', validateSignInRequest, isRequestValidated, signIn)

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)





module.exports = router;