
const {   addNotifications,
          getAllNotifications,
          getAllVerifications,
          verifyLisence,  
          getAllUserDetails,
          blockUnblock,
          getAllOwners} = require('../controller/adminController')

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


module.exports = router
