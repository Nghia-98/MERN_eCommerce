import path from 'path';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const router = express.Router();

const createFileName = ({ fieldname, originalname }) => {
  const extName = path.extname(originalname); //
  const fileName = originalname.substring(
    0,
    originalname.length - extName.length
  );

  return `${fieldname}-${fileName}-${Date.now()}${extName}`;
};

// Config router to upload to aws-s3
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3: s3,
  bucket: 'proshop-aws-s3-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    // console.log('file', file);
    cb(null, createFileName(file));
  },
});

const uploadS3 = multer({ storage: storageS3 });

router.post('/s3', uploadS3.single('image'), (req, res) => {
  res.json({
    message: 'Upload image to aws-s3 successfully!',
    filePath: req.file.location,
  });
});

// ------ Config upload image to server backend -------
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.json({
    message: 'Upload image successfully!',
    filePath: `/${req.file.path}`,
  });
});

export default router;
