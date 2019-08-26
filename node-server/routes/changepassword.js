let express = require('express');
let router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

let db = require('../db');
let User = db.user;

router.post('/api/changepassword', async (request, response, next)=>{
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send(info.message);
      } else if (user.email) {



        const {oldpassword} = request.body;
        let email = request.body.email;
        let password = request.body.password;

        console.log(`From change password the old password`);
        console.log(oldpassword);
        console.log(`From change password email: ${email}`);
        console.log(`From change password newpassword: ${password}`);


        const checkoldpassword = await User.findOne({$and:[{email:email}]});
        console.log(`From change password find return object ${checkoldpassword}`);

        if(checkoldpassword){
          console.log(`The returned pw from db, API: change passord: ${checkoldpassword.password}`);
          const hashedpw = await bcrypt.hash(oldpassword, 12);
          console.log(`The hashed pw is ${hashedpw}`);
          bcrypt.compare(oldpassword, checkoldpassword.password).then( async(data) => {
            console.log(`The data from bcrypt is  ${data}`);
          if (data !== true) {
            console.log('passwords do not match');
            response.json({success: false, code:0, message: 'Old password does not match'});
          }
          if(data) {
          const hashedpw = await bcrypt.hash(password, 12);
          const updated = await User.findOneAndUpdate({email:email},{$set:{password: hashedpw}});
          console.log('From the change password');
          console.log(updated);
          if(updated){
              response.json({success: true, message: 'Password updated', users: updated});
          }else {
              response.json({success: false, code:1, message: 'Password not Updated'});
              }}

        }).catch(err=>console.log(err));




          // OLD implementation
          // const updated = await User.findOneAndUpdate({email:'email@email.com'},{$set:{password: password}});
          // console.log('From the change password');
          // console.log(updated);
          // if(updated){
          //     response.json({success: true, message: 'Password updated', users: updated});
          // }else {
          //     response.json({success: false, code:1, message: 'Password not Updated'});
          //     }
        } else {
          response.json({success: false, code:0, message: 'Old password does not match'});
        }
      }
    })(request,response, next);






    // OLD implementation
    // const {oldpassword} = request.body;
    // let email = request.body.email;
    // let password = request.body.password;
    // console.log(oldpassword);
    // const checkoldpassword = await User.findOne({$and:[{email:email},{password:oldpassword}]});
    //
    // if(checkoldpassword){
    //   const updated = await User.findOneAndUpdate({email:'email@email.com'},{$set:{password: password}});
    //   console.log('From the change password');
    //   console.log(updated);
    //   if(updated){
    //       response.json({success: true, message: 'Password updated', users: updated});
    //   }else {
    //       response.json({success: false, code:1, message: 'Password not Updated'});
    //       }
    // } else {
    //   response.json({success: false, code:0, message: 'Old password does not match'});
    // }


});

module.exports = router;
