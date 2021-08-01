const multer = require('multer');
const path = require('path');
const CustomError = require('../../helpers/CustomError');

// Storage, FileFilter

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        
        const rootDir = path.dirname(require.main.filename);
        callback(null, path.join(rootDir, "/app/public/uploads"));
    },
    filename: function(req,file,callback) {
        console.log(file);
        const extension = file.mimetype.split('/')[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension;
        callback(null, req.savedProfileImage);
    }
});

const fileFilter = (req,file,callback) => {
    let allowedMimeTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    if(!allowedMimeTypes.includes(file.mimetype)){
        return callback(new CustomError("Please provide a valid image file", 400), false);

    }
    return callback(null, true);
};

const profileImageUpload = multer({storage, fileFilter});

module.exports = profileImageUpload;