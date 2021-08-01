import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const createFileName = ({ fieldname, originalname }) => {
  const extName = path.extname(originalname); //
  const fileName = originalname.substring(
    0,
    originalname.length - extName.length
  );

  return `${fieldname}-${fileName}-${Date.now()}${extName}`;
};

// Config aws-s3
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();
const s3Storage = multerS3({
  s3: s3,
  bucket: 'proshop-aws-s3-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    // console.log('file', file);
    cb(null, createFileName(file));
  },
});

const uploadS3 = multer({ storage: s3Storage });

export default uploadS3;
