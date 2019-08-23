let express = require('express');
let router = express.Router();

let db = require('../db');
let User = db.user;

router.post('/api/changepassword', async (request, response)=>{
    const {oldpassword} = request.body;
    let email = request.body.email;
    let password = request.body.password;
    console.log(oldpassword);
    const checkoldpassword = await User.findOne({$and:[{email:email},{password:oldpassword}]})

    if(checkoldpassword){
      const updated = await User.findOneAndUpdate({email:'email@email.com'},{$set:{password: password}});
      console.log('From the change password');
      console.log(updated);
      if(updated){
          response.json({success: true, message: 'Password updated', users: updated})
      }else {
          response.json({success: false, code:1, message: 'Password not Updated'});
          }
    } else {
      response.json({success: false, code:0, message: 'Old password does not match'});
    }


});

module.exports = router;
