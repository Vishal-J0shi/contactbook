let express = require('express');
let app = new express();

var cors = require('cors');

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
    'http://localhost:4200'     //this is my front-end url for development

  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors());

//test
let db = require('./db');
let User = db.user;
let Contact = db.contact;
//Import routes
let login = require('./routes/login');
let register = require('./routes/register');
let addcontact = require('./routes/addcontacts');
let getusers = require('./routes/getusers');
let getcontactbyid = require('./routes/getcontactsbyid');
let getimagebyemail = require('./routes/getimagebyemail');
let getimagebycontact = require('./routes/getimagebycontact');
let changepassword = require('./routes/changepassword');
let deleteuser = require('./routes/deleteuser');
let deletecontact = require('./routes/deletecontact');
let updatecontact = require('./routes/updatecontact');
let updateuser = require('./routes/updateuser');
let checkemail = require('./routes/checkuseremail');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add to express instanceuser
app.use('/', login);
app.use('/', register);
app.use('/', addcontact);
app.use('/', getusers);
app.use('/', getcontactbyid);
app.use('/', getimagebyemail);
app.use('/', getimagebycontact);
app.use('/', changepassword);
app.use('/', deleteuser);
app.use('/', deletecontact);
app.use('/', updateuser);
app.use('/', updatecontact);
app.use('/', checkemail);
app.use('/', require('./routes/updateprofile'))
app.use('/', require('./routes/forgotpassword'))

app.listen(3000, async()=>{

    console.log('Server is listening at port 3000');
    // const uid = await Contact.find({},{_id:1});
    // if(uid){
    //     console.log(uid);
    // }
    // const data = await Contact.findById(uid[0].id);

    // if(data){
    //     console.log('Below is the data');
    //     console.log(data);
    // }

})
