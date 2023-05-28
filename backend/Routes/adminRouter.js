const { adminLogin } = require('../controller/authController')

const router = require('express').Router()

router.post('/login',adminLogin)


module.exports = router
