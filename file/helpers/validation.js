const { check } = require('express-validator');

exports.signUpValidation = [

    check('name','Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('mobile', 'Mobile number should be contains 10 digits').isLength({ 
        min:10,
        max:10
     }),
     check('password','Password must be greater than 6 and contains at least one uppercase letter, one lowercase letter, and one number, and one special character')
     .isStrongPassword({
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1
     }),
     check('image').custom( (value, {req}) =>{
        if(req.files.image[0].mimetype === 'image/jpeg' || req.files.image[0].mimetype === 'image/png'){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload an image Jpeg, PNG'),
     check('document').custom( (value, {req}) =>{
        if(req.files.document[0].mimetype === 'application/msword' || req.files.document[0].mimetype === 'application/pdf'){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload pdf or doc format')

]