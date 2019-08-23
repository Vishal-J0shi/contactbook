let express = require('express');
let router = express.Router();

let db = require('../db');
let User = db.user;

router.get('/api/getusers', async (request, response)=>{
    const users = await User.find({isAdmin:false});
    if(users){
        response.json({success: true, message: 'user exists', users: users})
    }else {
        response.json({success: false, message: 'Users does not exist'});
        }
});

module.exports = router;
