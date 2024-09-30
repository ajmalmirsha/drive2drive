const router = require("express").Router();
const {
  login,
  updateUser,
  uploadProfileImage,
  googleLogin,
  register,
} = require("../controller/authController");
const {
  allVehicles,
  getVehiclesDetails,
} = require("../controller/ownerController");
const {
  createPaymentIntent,
  config,
} = require("../controller/paymentController");
const {
  uploadLisence,
  addReview,
  getAllVehicleDetails,
  getAllNotifications,
  addBooking,
  getApprovedBookings,
  paymentUpdation,
  setMessage,
  getMessages,
  getSenderDetails,
  getAvailablePlaces,
  addReport,
  applyCoupon,
  getBanners,
  checkLicenseVerification,
} = require("../controller/userController");

const { userAuthenticator } = require("../middlewares/Auth/auth");

const {
  uploadOptions,
  uploadlicense,
  reviewImage,
  cloudinaryUpload,
} = require("../middlewares/multer/multer");
const { sendSampleMail } = require("../utils/mail");

// user register
router.route("/email").post(sendSampleMail);

router.route("/register").post(register);

router.route("/google/login").post(googleLogin);

// user login
router.route("/login").post(login);

// list all vehicles
router.get("/list-all-vehicle", userAuthenticator, getAllVehicleDetails);

// config payment
router.get("/config", userAuthenticator, config);

// create payment intent
router.post("/create-payment-intent", userAuthenticator, createPaymentIntent);

// payment status updation
router.patch("/payment-success", userAuthenticator, paymentUpdation);

// get all notifications of user
router.get(
  "/get-all-notifications/:role",
  userAuthenticator,
  getAllNotifications
);

// add booking
router.post("/add-booking", userAuthenticator, addBooking);

// update user profile
router.post("/update-user", userAuthenticator, updateUser);

// update profile image
router.post(
  "/upload-profile-image",
  userAuthenticator,
  cloudinaryUpload.single("image"),
  uploadProfileImage
);

// get vehicle details
router.get("/vehicle/data/:id", userAuthenticator, getVehiclesDetails);

// get approved bookings
router.get(
  "/get-all-approved-bookings",
  userAuthenticator,
  getApprovedBookings
);

// add new review
router.post(
  "/vehicle/review/add",
  userAuthenticator,
  cloudinaryUpload.single("image"),
  addReview
);

// add license
router.post(
  "/add-license",
  cloudinaryUpload.fields([
    { name: "license[front]", maxCount: 1 },
    { name: "license[back]", maxCount: 1 },
  ]),
  uploadLisence
);

// get owner details
router.get("/get-owner-details/:userId", getSenderDetails);

// get all availble places
router.get("/available-places", getAvailablePlaces);

// sent message
router.post("/sent-message", userAuthenticator, setMessage);

// get all messages
router.post("/get-all-messages", userAuthenticator, getMessages);

// report route
router.post("/add-report", userAuthenticator, addReport);

// apply coupon
router.post("/apply/coupon", userAuthenticator, applyCoupon);

// get banners
router.get("/get/all/banners", userAuthenticator, getBanners);

// for checking license verifiaction
router.get(
  "/check-license-verifications",
  userAuthenticator,
  checkLicenseVerification
);

module.exports = router;
