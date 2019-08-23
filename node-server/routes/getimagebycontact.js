let express = require('express');
let router = express.Router();
var path = require('path');
var fs = require('fs');

let db = require('../db');
let Contact = db.contact;



router.post('/api/getimagebycontact', async (request, response)=>{
    let id = request.body.id;

    // Send image code

                // var img = fs.readFileSync(request.file.path);
                // response.writeHead(200, {'Content-Type': 'image/jpeg' });
                // response.end(img, 'binary');
    const image = await Contact.findById(id);
    console.log(image.profile);
    var img = fs.readFileSync(image.profile);
    response.writeHead(200, {'Content-Type': 'image/jpeg' });
    response.end(img, 'binary');

});

module.exports = router;
