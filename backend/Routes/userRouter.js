const router = require('express').Router()
const { signup, login, updateUser, uploadProfileImage} =  require('../controller/authController')
const { allVehicles, getVehiclesDetails } = require('../controller/ownerController')
const { uploadLisence, addReview, getVehicleData, getAllVehicleDetails, editProductDetails } = require('../controller/userController')
const { uploadOptions, uploadlicense, reviewImage } = require('../middlewares/multer/multer')
router.post('/signup',signup)

router.post('/login',login)

router.post('/update-user',updateUser)

router.post('/upload-profile-image',uploadOptions.single('image'),uploadProfileImage)

router.post('/add-license', uploadlicense.fields([
    { name: 'license[front]', maxCount: 1 },
    { name: 'license[back]', maxCount: 1 }
  ]), uploadLisence);

router.get('/list-all-vehicle',getAllVehicleDetails)

router.get('/vehicle/data/:id',getVehiclesDetails)

router.post('/vehicle/review/add',reviewImage.single('image'),addReview)

router.get('/list-all/:vehicle',getVehicleData)

router.get('/edit-product-details/:id',editProductDetails)


module.exports = router