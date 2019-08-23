let mongoose = require('mongoose');
let schema = mongoose.Schema;
let uri = 'mongodb://localhost:27017/contactbook'

mongoose.connect(uri, {useNewUrlParser:true, useFindAndModify:false}).then(
    (success)=>{
        console.log('Database connected');
    },
    (fail)=>{
        console.log('Failed to connect to Mongo');
    }
)

let users = new schema({
    name: String,
    email: String,
    phone: Number,
    profile: String,
    password: String,
    isAdmin: {type: Boolean, default: false}
})

let contacts = new schema({
    userId: String,
    name: String,
    email: String,
    phone: Number,
    profile: String,
    address: String
})

let forgottoken = new schema({
  email: String,
  hash: String
})

module.exports.user = mongoose.model('user',users);
module.exports.contact = mongoose.model('contact',contacts);
module.exports.forgotpassword = mongoose.model('forgotpassword', forgottoken);
