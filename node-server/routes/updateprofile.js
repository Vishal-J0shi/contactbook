let express = require('express');
let router = express.Router();
var path = require('path');
var fs = require('fs');

let db = require('../db');
let User = db.user;


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


router.post('/api/updateprofile',upload.single('profile'), async (request, response)=>{
    let id = request.body.id;
    let email = request.body.email;
    let name = request.body.name;
    let phone = request.body.phone;

    let file = request.file;

    if(file){
        const update = await User.findByIdAndUpdate(id,{
            name: name,
            email: email,
            phone: phone,
            profile: request.file.path,
            address: address,
            password: password
        });
        console.log(update.profile);
        if(update){
            console.log(update)
            response.json({success:true, message: 'User updated'});
        }else {
            response.json({success: false, message:'User cannot be updated'});
        }
    }

    if(!file) {
      const update = await User.findByIdAndUpdate(id,{
          name: name,
          email: email,
          phone: phone,
      });
      if(update){
          console.log(update)
          const newData = await User.findById(id);
          if(newData) {
            response.json({success:true, message: 'User updated', user:newData});
          }else {
            response.json({success: false, message:'Internal Error'})
          }
      }else {
          response.json({success: false, message:'User cannot be updated'});
      }
    }
    // Send image code

                // var img = fs.readFileSync(request.file.path);
                // response.writeHead(200, {'Content-Type': 'image/jpeg' });
                // response.end(img, 'binary');


});

module.exports = router;
