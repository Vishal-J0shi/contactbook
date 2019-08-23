let express = require('express');
let router = express.Router();
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var randtoken = require('rand-token').uid;

let db = require('../db');
let User = db.user;
let Forgot = db.forgotpassword;




router.post('/api/forgotpassword', async (request, response)=>{

    let email = request.body.email;
    var hash = randtoken(16);

    const forgot = new Forgot({
      email,
      hash
    })

    forgot.save((error, saved) =>{
      if(saved){
        response.json({success: true, url: `http://localhost:4599/generatepassword/${hash}`});
      }
      if(error){
        response.json({success: false, message: 'Cannot process request right now'})
      }
    })
});

router.post('/api/verifytoken', async (request, response)=>{

    let id = request.body.id;

    const token = await Forgot.findOne({hash:id})
    if(token) {
      response.json({success: true, message: 'Token Verified'})
    } else{
      response.json({success: false, message: 'Token does not exist'});
    }


});

router.post('/api/resetpassword', async (request, response)=>{
    let hash = request.body.hash;
    let password = request.body.password;
    const emailretrived = await Forgot.findOne({hash:hash});
    if(emailretrived.email){
      const newUser = await User.findOneAndUpdate({email: emailretrived.email},{password:password},{new: true})
      console.log('Below is the returned user after pw change')
      console.log(newUser)
      if(newUser) {
        const deletehash = await Forgot.deleteOne({hash:hash});
        console.log('After deleting hash');
        console.log(deletehash);
        if(deletehash.deletedCount>0) {
          response.json({success: true, message:'password updated and hash deleted'});
        }else{
          response.json({success: true, message:'password updated and hash not deleted'});
        }
      }else {
        response.json({success: false, message: 'Password cannot be updated at the moment'})
      }
    }

});

module.exports = router;
