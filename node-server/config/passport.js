const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../config/jwtconfig')

require('dotenv').config();

const bcrypt = require('bcryptjs');

const db = require('../db');
const User = db.user;

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email,password, done) => {
        console.log(`Email is ${email}`)
        console.log(`Password is ${password}`)
       const userfound= await User.findOne({email})
       console.log(userfound);
        if(!userfound){
            return done(null, false, { message: 'bad username' });// handled by catch in angular
        }
            console.log(userfound.password);
            bcrypt.compare(password, userfound.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            return done(null, userfound);
          }).catch(err=>console.log(err));
    },
  ),
);

const optsw = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwtSecretsecret',
};

// console.log(process.env.SECRET);
passport.use(
  'jwt',
  new JWTstrategy(optsw, async (jwt_payload, done) => {
    const userInfo = await User.findById(jwt_payload.id);
    console.log(jwt_payload.id);
    console.log(userInfo);
    if(userInfo) {
        console.log('user found in db in passport');
        done(null, userInfo);
    }else {
        console.log('user not found in db');
                done(null, false,{ message: 'token expired' });
        }
    }

  ),
);
