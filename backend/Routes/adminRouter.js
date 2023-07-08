
const {   addNotifications,
          getAllNotifications,
          getAllVerifications,
          verifyLisence,  
          getAllUserDetails,
          blockUnblock,
          getAllOwners,
          getAllSpams,
          getAllbookings,
          getAllSales,
          addCoupon,
          getCoupon,
          getVehicles,
          getAllSalesData,
          addBanner,
          getBanners,
          DeleteBanner} = require('../controller/adminController')

const { adminLogin } = require('../controller/authController')

const { adminAuthenticator } = require('../middlewares/Auth/auth')


const { notificationImage, bannerUploadOptions, cloudinaryUpload } = require('../middlewares/multer/multer')

const router = require('express').Router()

// admin login
router.post('/login',adminLogin)

// verification of all routes
router.use(adminAuthenticator)

// add new notification
router.post('/add-notification',cloudinaryUpload.single('image'),addNotifications)

// get all notifications
router.get('/get-all-notifications',getAllNotifications)

// for get all license verifications
router.get('/get-all-verifications',getAllVerifications)

// get all details of users
router.get('/get-all-user-details',getAllUserDetails)

// verification of lisence
router.put('/verify/license',verifyLisence)

// block and unblock users
router.put('/user/block/un-block',blockUnblock)

// get all owners
router.get('/get/all/owners',getAllOwners)

// getting all spam reports
router.get('/get/all/spam-reports',getAllSpams)

// getting all bookings
router.get('/get/all-bookings',getAllbookings)

// getting all sales report
router.get('/get/sales-report',getAllSales)

// add coupon
router.post('/add-coupon',addCoupon)

// getting all coupons
router.get('/get/all/coupons',getCoupon)

// getting all vehicles
router.get('/get/all/vehicles',getVehicles)

// getting all sales data for graph
router.get('/get/all/sales/data',getAllSalesData)

// add banner
router.post('/add/banner',bannerUploadOptions.single('image'),addBanner)

// get all banners
router.get('/get/all/banners',getBanners)

// delete banner
router.delete('/delete/banner/:bannerId',DeleteBanner)

router.use((req, res)=> {
    res.status(500).json({success:false})
})

module.exports = router
