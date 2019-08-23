let express = require('express');
let router = express.Router();

let db = require('../db');
let Contact = db.contact;

router.post('/api/deletecontact', async (request, response)=>{
    let id = request.body.id
    const users = await Contact.findByIdAndRemove(id);
    console.log(users);
    if(users){
        response.json({success: true, message: 'contact deleted'})
    }else {
        response.json({success:false, message: 'contact is not deleted'});
        }
});

module.exports = router;
