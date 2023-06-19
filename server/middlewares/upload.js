const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, buf) {
      if (err) {
        return cb(err);
      }
      const filename = buf.toString('hex') + '.' + file.originalname.split('.').pop();
      cb(null, filename);
    });
  }
});

const upload = multer({ storage: storage });

function uploadImage(req, res, next) {
  upload.single('image')(req, res, function (err) {
    if (err) {
      return next(err);
    }
    next();
  });
}

module.exports = { uploadImage };