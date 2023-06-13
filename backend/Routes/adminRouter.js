const { addNotifications, getAllNotifications, getAllVerifications, verifyLisence } = require('../controller/adminController')
const { adminLogin } = require('../controller/authController')
const { notificationImage } = require('../middlewares/multer/multer')

const router = require('express').Router()

router.post('/login',adminLogin)
router.post('/add-notification',notificationImage.single('image'),addNotifications)
router.get('/get-all-notifications',getAllNotifications)

router.get('/get-all-verifications',getAllVerifications)
router.put('/verify/license',verifyLisence)


module.exports = router
