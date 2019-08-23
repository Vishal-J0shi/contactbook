let express = require('express');
let router = express.Router();

let db = require('../db');
let User = db.user;

router.post('/api/login', async (request, response)=>{
    let email = request.body.email;
    let password = request.body.password;

    console.log(email);
    console.log(password);

    const user = await User.findOne({$and:[{email : email},{password:password}]});
    // Test
    // console.log(user);

    if(user){
        console.log(user);
        response.json({
            success: true,
            user: { "isAdmin": user.isAdmin,
                  "name": user.name,
                  "email": user.email,
                  "phone": user.phone,
                  "profile": user.profile,
                  }
        });
    } else{
        response.status(401).json({success: false, message: 'Invalid username or password'})
    }
});

module.exports = router;
