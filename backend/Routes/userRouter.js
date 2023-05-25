const router = require('express').Router()
const { signup, login, updateUser, uploadProfileImage} =  require('../controller/authController')
const { uploadLisence } = require('../controller/userController')
const { uploadOptions, uploadlicense } = require('../middlewares/multer/multer')
router.post('/signup',signup)

router.post('/login',login)

router.post('/update-user',updateUser)

router.post('/upload-profile-image',uploadOptions.single('image'),uploadProfileImage)

router.post('/add-license',uploadlicense.single('image'),uploadLisence)

module.exports = router