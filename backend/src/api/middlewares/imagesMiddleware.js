import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const public_id = req.body.name ? req.body.name.trim() : 'default_name';
    const folder = req.body.category ? req.body.category : 'default_category';
    return {
      folder: folder,
      format: 'png', 
      public_id: public_id,
    };
  },
});


const parser = multer({ storage: storage });



export default parser;