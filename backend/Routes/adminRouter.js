
const {   addNotifications,
          getAllNotifications,
          getAllVerifications,
          verifyLisence,  
          getAllUserDetails,
          blockUnblock,
          getAllOwners,
          getAllSpams,
          getAllbookings,
          getAllSales} = require('../controller/adminController')

const { adminLogin } = require('../controller/authController')

const { notificationImage } = require('../middlewares/multer/multer')

const router = require('express').Router()

router.post('/login',adminLogin)
router.post('/add-notification',notificationImage.single('image'),addNotifications)
router.get('/get-all-notifications',getAllNotifications)

router.get('/get-all-verifications',getAllVerifications)

router.get('/get-all-user-details',getAllUserDetails)
router.put('/verify/license',verifyLisence)

router.put('/user/block/un-block',blockUnblock)

router.get('/get/all/owners',getAllOwners)

// getting all spam reports

router.get('/get/all/spam-reports',getAllSpams)

// getting all bookings
router.get('/get/all-bookings',getAllbookings)

// getting all sales report
router.get('/get/sales-report',getAllSales)


module.exports = router
