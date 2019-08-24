let express = require('express');
let router = express.Router();
const passport = require('passport');

let db = require('../db');
let User = db.user;

router.get('/api/getusers', async (request, response)=>{

  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send(info.message);
      } else if (user.email) {
        const users = await User.find({isAdmin:false});
        if(users){
            response.json({success: true, message: 'user exists', users: users});
        }else {
            response.json({success: false, message: 'Users does not exist'});
            }
      }
    })(request,response, next);


    // OLD implemenattion
    // const users = await User.find({isAdmin:false});
    // if(users){
    //     response.json({success: true, message: 'user exists', users: users});
    // }else {
    //     response.json({success: false, message: 'Users does not exist'});
    //     }
});

module.exports = router;
