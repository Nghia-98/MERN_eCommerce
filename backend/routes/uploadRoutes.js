import express from 'express';
import { uploadS3, uploadDisk } from '../config/multer/index.js';

const router = express.Router();

router.post('/s3', uploadS3.single('image'), (req, res) => {
  res.json({
    message: 'Upload image to aws-s3 successfully!',
    filePath: req.file.location, // The S3 url to access the file
  });
});

router.post('/', uploadDisk.single('image'), (req, res) => {
  res.json({
    message: 'Upload image to backend server successfully!',
    filePath: `/${req.file.path}`, // '/uploads/fileName'
  });
});

export default router;
