let express = require('express');
let router = express.Router();
var path = require('path');
var fs = require('fs');

var multer  = require('multer')

let db = require('../db');
let User = db.user;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/vishalj/Documents/Vishalj-Workspace/Projects/ContactBook/node-server/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })

  var upload = multer({ storage: storage })

router.post('/api/register',upload.single('profile'), async (request, response)=>{
    console.log('Register Called ');
    let email = request.body.email;
    let password = request.body.password;
    let name = request.body.name;
    let phone = request.body.phone;

    let file = request.file;

    // check email already exist or not
    // const userExist =  await User.findOne({email: email});
    // if(userExist) {
    //   response.json({success: false, message:'User Already exist'});
    // }else {
    //   let user = new User({
    //     name:name,
    //     email: email,
    //     phone: phone,
    //     password: password
    //   })
    //   console.log('below is tha data');
    //   console.log(user);
    //   user.save((err,data)=>{
    //     if(err){console.log(err)}
    //     if(data){console.log('done')}
    //   })
    // }



    if(file){
        User.create({
            name: name,
            email: email,
            phone: phone,
            profile: request.file.path,
            password: password,
        }, (error, success)=>{
            if(error){
                console.log('Error while saving user');
                response.json({message:'Error while adding user'})
            }else {
                console.log('Data Saved');
                response.json({message: 'Used added successfully'})

                // Send image code

                // var img = fs.readFileSync(request.file.path);
                // response.writeHead(200, {'Content-Type': 'image/jpeg' });
                // response.end(img, 'binary');
            }
        })
    }

    if(!file){
      User.create({
          name: name,
          email: email,
          phone: phone,
          password: password,
      }, (error, success)=>{
          if(error){
              console.log('Error while saving user');
              response.json({success: false, message:'Error while adding user'})
          }else {
              console.log('Data Saved');
              response.json({success: true, message: 'Used added successfully'})

              // Send image code

              // var img = fs.readFileSync(request.file.path);
              // response.writeHead(200, {'Content-Type': 'image/jpeg' });
              // response.end(img, 'binary');
          }
      })
    }

});

module.exports = router;
