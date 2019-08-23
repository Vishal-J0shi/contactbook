let express = require('express');
let router = express.Router();

let db = require('../db');
let User = db.user;
let Contact = db.contact;

router.get('/api/checkemail/:email', async (request, response)=>{
    console.log('This method called');
    console.log(request.params.email);
    let email = request.params.email;
    const userEmailExist = await User.findOne({email:email});
    const contactEmailExist = await Contact.findOne({email:email});

    console.log(userEmailExist);
    if(userEmailExist || contactEmailExist){
        response.json({success: false, message: 'Email Exists'})
    }else {
        response.json({success: true, message: 'Email does not exist'});
        }
});

module.exports = router;
