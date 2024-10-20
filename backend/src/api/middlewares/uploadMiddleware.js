import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); 
export const uploadMiddleware = upload.single('quote_img'); 