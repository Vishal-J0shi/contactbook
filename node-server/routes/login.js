let express = require('express');
let router = express.Router();
const stringify = require('json-stringify-safe');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../config/jwtconfig');

let db = require('../db');
let User = db.user;

router.post('/api/login', async (request, response, next)=>{
    passport.authenticate('login', async (err, users, info) => {
        console.log('made it inside callback of authenticate');
        if (err) {
          console.error(`error ${err}`);
        }
        if (info !== undefined) {
          console.error(info.message);
          if (info.message === 'bad username') {
            response.status(401).send(info.message); // will be catched by catch rxjs in angular
          } else {
            response.status(403).send(info.message); // will be catched by catch rxjs in ang
          }
        } else {
            console.log('Made it here at the else if bro');
            const userInfo = await User.findOne({email: request.body.email});
            console.log(userInfo);
            if(userInfo) {
                // change the below secret
                const token = jwt.sign({id: userInfo.id}, 'jwtSecretsecret' , {expiresIn:72000});
                response.status(200).json({
                    success: true,
                    auth: true,
                    token: token,
                    user: {
                        id: userInfo.id,
                        isAdmin: userInfo.isAdmin,
                        name: userInfo.name,
                        email: userInfo.email,
                        phone: userInfo.phone,
                    },
                    message: 'user found & logged in',
                });
            }
        }
      })(request, response, next);


    // OLD implementation

    // let email = request.body.email;
    // let password = request.body.password;

    // console.log(email);
    // console.log(password);

    // const user = await User.findOne({$and:[{email : email},{password:password}]});
    // // Test
    // // console.log(user);

    // if(user){
    //     console.log(user);
    //     response.json({
    //         success: true,
    //         user: { "isAdmin": user.isAdmin,
    //               "name": user.name,
    //               "email": user.email,
    //               "phone": user.phone,
    //               "profile": user.profile,
    //               }
    //     });
    // } else{
    //     response.status(401).json({success: false, message: 'Invalid username or password'})
    // }
});

module.exports = router;
