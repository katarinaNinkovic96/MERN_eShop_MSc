import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        //call cb-callback - null (because there's no error), add where we want to upload (file called uploads)
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        //for extension we want jpg and png - for this we use path module from node (original name pull off extension which is original)
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})


function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    //extname true/false. If extension of originalk match with filetypes true
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //check the mime type. Every file has mime type (like a JPEG image /jpeg)
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

//what we're going to pass in as middleware to our row
const upload = multer({
    //if only storage, storage allow us to upload any type of file 
    storage,
    //because we want that we use filter
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb) 
    }
})

//we usew '/' because this upload routes file is going to be connected to api/upload
//middleware upload - we can multi images but now we want one (single)
router.post('/', upload.single('image'), (req, res) => {

    //all we're going to send back from this route is the path
    res.send(`/${req.file.path}`)
})

export default router;
