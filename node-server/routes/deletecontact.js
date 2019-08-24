let express = require('express');
let router = express.Router();
const passport = require('passport');

let db = require('../db');
let Contact = db.contact;

router.post('/api/deletecontact', async (request, response, next)=>{
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send(info.message);
      } else if (user.email) {
        let id = request.body.id;
        const users = await Contact.findByIdAndRemove(id);
        console.log(users);
        if(users){
            response.json({success: true, message: 'contact deleted'});
        }else {
            response.json({success:false, message: 'contact is not deleted'});
            }
      }
    })(request,response, next);












    // old implementation
    // let id = request.body.id;
    // const users = await Contact.findByIdAndRemove(id);
    // console.log(users);
    // if(users){
    //     response.json({success: true, message: 'contact deleted'});
    // }else {
    //     response.json({success:false, message: 'contact is not deleted'});
    //     }
});

module.exports = router;
