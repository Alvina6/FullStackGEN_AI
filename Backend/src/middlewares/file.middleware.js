const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      const error = new Error('Only PDF resume files are allowed');
      error.status = 400;
      return callback(error);
    }
    return callback(null, true);
  },
});

 module.exports =upload
