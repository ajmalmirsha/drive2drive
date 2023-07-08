const multer = require("multer");
const fs = require('fs');
const path = require('path');

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

//profile images

const imagesDirectory = path.join(__dirname, '../../public/images/');

if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, imagesDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadOptions = multer({ storage: storage });


//banner images

const bannerImagesDirectory = path.join(__dirname, '../../public/images/banner');

if (!fs.existsSync(bannerImagesDirectory)) {
  fs.mkdirSync(bannerImagesDirectory, { recursive: true });
}

const bannerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, bannerImagesDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const bannerUploadOptions = multer({ storage: bannerstorage });




// lisense images 

const imagesPath = path.join(__dirname, '../../public/images/license/');


if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadlicense = multer({ storage: storages });

// lisense images 

const reviewimagesPath = path.join(__dirname, '../../public/images/reviewImages/');


if (!fs.existsSync(reviewimagesPath)) {
  fs.mkdirSync(reviewimagesPath, { recursive: true });
}

const reviewstorages = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, reviewimagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const reviewImage = multer({ storage: reviewstorages });


const notificationimagesPath = path.join(__dirname, '../../public/images/notification/');


if (!fs.existsSync(notificationimagesPath)) {
  fs.mkdirSync(notificationimagesPath, { recursive: true });
}

const notificationstorages = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, notificationimagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const notificationImage = multer({ storage: notificationstorages });


const cloud = multer.diskStorage({})
const cloudinaryUpload = multer({storage : cloud})
module.exports = { uploadOptions, uploadlicense, reviewImage, notificationImage, bannerUploadOptions, cloudinaryUpload };
