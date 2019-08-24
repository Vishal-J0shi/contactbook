let express = require('express');
let router = express.Router();
const passport = require('passport');

let db = require('../db');
let Contact = db.contact;

router.post('/api/getcontactsbyid', async (request, response, next)=>{

    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info !== undefined) {
          console.log(info.message);
          response.status(401).send(info.message);
        } else if (user.email) {
            let userId = request.body.userId;
            const contacts = await Contact.find({userId:userId});
            if(contacts){
                response.json({success: true, message: 'contact exists', contacts: contacts});
            }else {
                response.json({success: false , message: 'Contacts does not exist'});
                }
        }
      })(request,response, next);

    // OLD implemenattion
    // let userId = request.body.userId;
    // const contacts = await Contact.find({userId:userId});
    // if(contacts){
    //     response.json({success: true,message: 'contact exists', contacts: contacts})
    // }else {
    //     response.json({success: false , message: 'Contacts does not exist'});
    //     }
});

module.exports = router;
