const express = require('express');
const user = express();
const bodyParser = require('body-parser');

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended:true }));

const multer = require('multer');
const path = require('path');

user.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        if(file.mimetype === 'image/jpeg' 
        || file.mimetype === 'image/png'){
            cb(null,path.join(__dirname,'../public/image'));
        }
        else{
            cb(null,path.join(__dirname,'../public/document'));
        }
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const fileFilter = (req,file,cb) => {
    if (file.fieldname === "image") {
        (file.mimetype === 'image/jpeg' 
         || file.mimetype === 'image/png')
        ? cb(null,true)
        : cb(null,false);
    }
    else if(file.fieldname === "document"){
        (file.mimetype === 'application/msword' 
        || file.mimetype === 'application/pdf')
        ? cb(null,true)
        : cb(null,false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
}).fields([{ name: 'document', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

const userController = require('../controllers/userController');

const { signUpValidation } = require('../helpers/validation');

user.post('/register',upload, signUpValidation, userController.register);

module.exports = user;