const { ownerRegister, ownerLogin } = require('../controller/authController')

const router = require('express').Router()




router.post('/owner-register', ownerRegister)

router.post('/login', ownerLogin)

module.exports = router