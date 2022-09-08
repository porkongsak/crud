var express = require('express');
var router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken')


/* register */
router.post('/register', async(req, res) => {
  try{

    const { username, password, email} = req.body;
    if(password.length < 5){
      return res.status(400).send({
        message : 'Password must be at least 5 characters'
      })
    }
    var user = await User.findOne({ email })

    if(user){
      return res.status(400).send({
        message : 'User already exits!'
      })
    }
    //Encrypt
    const salt = await bcrypt.genSalt(10);
    let password01 = await bcrypt.hash(password,salt)

    newuser = new User({
      username ,
      email ,
      password: password01,
    });

   
    await newuser.save();

    let currentuser = await User.find();

    return res.status(200).send({
      data : currentuser,
      message : 'User created!'
    })
  }catch(err){
    console.log(err);
    res.status(500).send({
      message: 'Server Errer',
      success: false,
    })
  }
});



/** Login */
router.post('/login',async(req, res) =>{
  try{

    const { email, password } = req.body;
    

    var user = await User.findOne({ email })
    
    if(user){
      
     
      const isMath = await bcrypt.compare( password, user.password);

      //!isMath &&  res.status(400).send({ message : 'Invalid password'})
      if(!isMath){
        return res.status(400).send('password invalid')
      }
      //payload
      const payload = {
        user:{
          username: user.username,
          email : user.email,
          role :user.role
        }
      }

      // Generate Token
      jwt.sign(
        payload,
        process.env.KEY_JWT,
        {expiresIn : 3000},
        (err,token) =>{
          if(err) throw err;
          res.json({token, payload})
        });


    } else{
      return res.status(400).send('User not found!!')
    }

  }catch(err){
    console.log(err);
    res.status(500).send({
      message: 'Server Errer',
      success: false,
    })
  }
})




module.exports = router;
