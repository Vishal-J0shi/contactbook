let express = require('express');
let router = express.Router();

let db = require('../db');
let User = db.user;

router.post('/api/deleteuser', async (request, response)=>{
    let id = request.body.id
    const users = await User.findByIdAndRemove(id);
    if(users){
        response.json({success: true, message: 'user deleted', users: users})
    }else {
        response.json({success: false, message: 'User is not deleted'});
        }
});

module.exports = router;
