const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    
    },
    password:{
        type:String,
        
    },
    email:{
        type: String,
        
       
    },
    role:{
        type:String,
        default:'user',
    },
   
}, 
{ timestamps: true }
);

module.exports = mongoose.model('users',UserSchema)
