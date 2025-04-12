const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Detination to store image
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    const uploadPath = path.join(__dirname, "..", "uploads", folder);

    // check and create directory if neccesary
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // uplaod only png and jpg formats
      return cb(new Error("Apenas formatos PNG e JPG"));
    }

    cb(undefined, true);
  },
});

module.exports = { imageUpload };
