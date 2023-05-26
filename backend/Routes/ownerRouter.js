
const { ownerRegister, ownerLogin } = require('../controller/authController')
const { addVehicle, allVehicles } = require('../controller/ownerController')
const { uploadOptions } = require('../middlewares/multer/multer')

const router = require('express').Router()




router.post('/owner-register', ownerRegister)

router.post('/login', ownerLogin)


router.post('/add-vehicle',uploadOptions.single('image'), addVehicle)
router.get('/get-all-vehicles', allVehicles)

module.exports = router