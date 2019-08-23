let express = require('express');
let router = express.Router();
let path = require('path');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/vishalj/Documents/Vishalj-Workspace/Projects/ContactBook/node-server/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })

  var upload = multer({ storage: storage })

let db = require('../db');
let Contact = db.contact;

router.post('/api/addcontact',upload.single('profile'), async (request, response)=>{
    let userId = request.body.userId;
    let email = request.body.email;
    let address = request.body.address;
    let name = request.body.name;
    let phone = request.body.phone;

    let file = request.file;

    if(file){
        Contact.create({
            userId: userId,
            name: name,
            email: email,
            address: address,
            phone: phone,
            profile: request.file.path,
        }, (error, success)=>{
            if(error){
                console.log('Error while saving user');
                response.json({success: false, message:'Error while adding user'})
            }else {
                console.log('Data Saved');
                response.json({success: true,message: 'Contact added successfully'})

                // Send image code

                // var img = fs.readFileSync(request.file.path);
                // response.writeHead(200, {'Content-Type': 'image/jpeg' });
                // response.end(img, 'binary');
            }
        })
    }else{
      Contact.create({
          userId: userId,
          name: name,
          email: email,
          address: address,
          phone: phone,
      }, (error, success)=>{
          if(error){
              console.log('Error while saving user');
              response.json({success: false,message:'Error while adding user'})
          }else {
              console.log('Data Saved');
              response.json({success: true, message: 'Contact added successfully'})

              // Send image code

              // var img = fs.readFileSync(request.file.path);
              // response.writeHead(200, {'Content-Type': 'image/jpeg' });
              // response.end(img, 'binary');
          }
      })
    }
});

module.exports = router;
