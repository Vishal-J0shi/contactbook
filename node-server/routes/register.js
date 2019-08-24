let express = require('express');
let router = express.Router();
var path = require('path');
var fs = require('fs');
const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require('bcryptjs');

var multer  = require('multer');

let db = require('../db');
let User = db.user;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/vishalj/Documents/Vishalj-Workspace/Projects/ContactBook/node-server/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  });

  var upload = multer({ storage: storage });

router.post('/api/register',upload.single('profile'), async (request, response)=>{
    console.log('Register Called ');
    console.log(request.body);

    let email = request.body.email;
    let password = request.body.password;
    let name = request.body.name;
    let phone = request.body.phone;

    let file = request.file;
    // es6 syntax
    // const {email, password, name, phone, file} = request.body;
    console.log(`Email: ${email}, password: ${password}, name: ${name}, phone: ${phone}, file: ${file}`);


    if(file){
      console.log('Made it inside file one');
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS ).then(hashedpassword => {
        User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedpassword,
        }, (error, success)=>{
            if(error){
                console.log('Error while saving user');
                response.status(401).json({success: false, message:'Error while adding user'});
            }else {
                console.log('Data Saved');
                //temp
                response.status(200).json({success: true, message: 'Used added successfully'});
            }
        });
    });
    }

    if(!file){
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS ).then(hashedpassword => {
            User.create({
                name: name,
                email: email,
                phone: phone,
                password: hashedpassword,
            }, (error, success)=>{
                if(error){
                    console.log('Error while saving user');
                    response.status(401).json({success: false, message:'Error while adding user'});
                }else {
                    console.log('Data Saved');
                    response.json({success: true, message: 'Used added successfully'});

                    // Send image code

                    // var img = fs.readFileSync(request.file.path);
                    // response.writeHead(200, {'Content-Type': 'image/jpeg' });
                    // response.end(img, 'binary');
                }
            });
        });
    }

});

module.exports = router;
