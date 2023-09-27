const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const uploadedFileFolderName = 'public';
exports.uploadedFileFolderName = uploadedFileFolderName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './' + uploadedFileFolderName)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 * 1024 } });
exports.upload = upload;