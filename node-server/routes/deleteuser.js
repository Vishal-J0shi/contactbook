let express = require('express');
let router = express.Router();
const passport = require('passport');

let db = require('../db');
let User = db.user;

router.post('/api/deleteuser', async (request, response, next)=>{

  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send(info.message);
      } else if (user.email) {
        let id = request.body.id;
        const users = await User.findByIdAndRemove(id);
        if(users){
            response.json({success: true, message: 'user deleted', users: users});
        }else {
            response.json({success: false, message: 'User is not deleted'});
            }
      }
    })(request,response, next);









    // OLD implementation
    // let id = request.body.id;
    // const users = await User.findByIdAndRemove(id);
    // if(users){
    //     response.json({success: true, message: 'user deleted', users: users});
    // }else {
    //     response.json({success: false, message: 'User is not deleted'});
    //     }
});

module.exports = router;
