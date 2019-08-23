let express = require('express');
let router = express.Router();
var path = require('path');
var fs = require('fs');

let db = require('../db');
let User = db.user;



router.post('/api/getimagebyemail', async (request, response)=>{
    let email = request.body.email;

    // Send image code

                // var img = fs.readFileSync(request.file.path);
                // response.writeHead(200, {'Content-Type': 'image/jpeg' });
                // response.end(img, 'binary');
    const image = await User.findOne({email:email},{_id:0, profile:1});
    console.log(image.profile);
    var img = fs.readFileSync(image.profile);
    response.writeHead(200, {'Content-Type': 'image/jpeg' });
    response.end(img, 'binary');

});

module.exports = router;
