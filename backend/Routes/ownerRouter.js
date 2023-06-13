
const { ownerRegister, ownerLogin } = require('../controller/authController')
const { addVehicle, allVehicles, getReviews, deleteVehicleImage, EditVehicleDetials, addVehicleImages, bookingVerifications, verifyBooking } = require('../controller/ownerController')
const { uploadOptions } = require('../middlewares/multer/multer')

const router = require('express').Router()

router.post('/owner-register', ownerRegister)

router.post('/login', ownerLogin)

router.post('/add-vehicle',uploadOptions.array('images',4), addVehicle)

router.get('/get-all-vehicles/:id', allVehicles)

router.get('/get-reviews/:id', getReviews)

router.post('/delete/vehicle/image/:id/:vehicleId', deleteVehicleImage)

router.post('/edit-vehicle', EditVehicleDetials)

router.get('/get-all-booking-verifications', bookingVerifications)

router.put('/verify/booking', verifyBooking)

router.post('/upload-vehicle-images',uploadOptions.array('images',4), addVehicleImages)



module.exports = router