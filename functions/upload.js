const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
})

export const upload = multer({
    storage: storage,
    fileFilter : (req, file, callback) => {
        if(file.mimetype === 'image/png' || file.mimeType === 'image/svg' || file.mimeType === 'image/jpg') {
            callback(null, true)
        } else {
            console.log('only jpg & png file supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 1024
    }
})