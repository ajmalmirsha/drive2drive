
const { ownerRegister, ownerLogin } = require('../controller/authController')

const { addVehicle,
        allVehicles,
        getReviews, 
        deleteVehicleImage, 
        EditVehicleDetials, 
        addVehicleImages, 
        bookingVerifications, 
        verifyBooking, 
        editProductDetails, 
        ownerSalesReport, 
        getOwnerSales } = require('../controller/ownerController')

const { uploadOptions } = require('../middlewares/multer/multer')

const { ownerAuthenticator } = require('../middlewares/Auth/auth')

const  { setMessage, 
         getMessages, 
         getContacts, 
         ownerNotifications } = require('../controller/userController')

const router = require('express').Router()

// owner registraion
router.post('/owner-register', ownerRegister)

// owner login
router.post('/login', ownerLogin)

// add vehicle
router.post('/add-vehicle',ownerAuthenticator, uploadOptions.fields([
    { name: 'rc[front]', maxCount: 1 },
    { name: 'rc[back]', maxCount: 1 },
    { name: 'images', maxCount: 4}
  ]), addVehicle)

// get all vehicles
router.get('/get-all-vehicles/:id',ownerAuthenticator, allVehicles)

// get reviews of the specific owner
router.get('/get-reviews/:id',ownerAuthenticator, getReviews)

// delete vehicle image
router.post('/delete/vehicle/image/:id/:vehicleId',ownerAuthenticator, deleteVehicleImage)

// get product details for edit
router.get('/edit-product-details/:id',ownerAuthenticator,editProductDetails)

// edit vehicle details
router.post('/edit-vehicle',ownerAuthenticator, EditVehicleDetials)

// get all booking verifications
router.get('/get-all-booking-verifications',ownerAuthenticator, bookingVerifications)

// verify bookings
router.put('/verify/booking',ownerAuthenticator, verifyBooking)

// upload vehicle images
router.post('/upload-vehicle-images',ownerAuthenticator,uploadOptions.array('images',4), addVehicleImages)

// send messages
router.post('/sent-message',ownerAuthenticator,setMessage)

// get all messages
router.post('/get-all-messages',ownerAuthenticator,getMessages)

// get all contacts for chat
router.get('/get-all-contacts',ownerAuthenticator,getContacts)

// get owner notifications
router.get('/get-owner-notifications',ownerAuthenticator,ownerNotifications)

// getting  owner sales
router.get('/get/sales-report',ownerAuthenticator,ownerSalesReport)

// getting  owner sales for chart
router.get('/get/owner/sales',ownerAuthenticator,getOwnerSales)

module.exports = router