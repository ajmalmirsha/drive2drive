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
    console.log('here');
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




// lisense images 

const imagesPath = path.join(__dirname, '../../public/images/license/');


if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    console.log('here');
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

module.exports = { uploadOptions, uploadlicense };
