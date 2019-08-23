let express = require('express');
let router = express.Router();

let db = require('../db');
let Contact = db.contact;

router.post('/api/getcontactsbyid', async (request, response)=>{

    let userId = request.body.userId;
    const contacts = await Contact.find({userId:userId});
    if(contacts){
        response.json({success: true,message: 'contact exists', contacts: contacts})
    }else {
        response.json({success: false , message: 'Contacts does not exist'});
        }
});

module.exports = router;
