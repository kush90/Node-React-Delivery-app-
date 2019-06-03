var express = require('express');
var User = require('../models/user');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let config = require('../config');


var router = express.Router();

router.post('/register', (req, res, next) => {
    const { name, phone_no,township,address,password ,role} = req.body;

    const user = new User({
      name,
      phone_no,
      township,
      address,
      password,
      role
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash Password
        user.password = hash;
        // Save User
        
          user.save();
          res.json({
            success:true,
            msg:"Successfully created"
          });
          // next();
       
      });
    });
  });

  // Auth User
  router.post('/auth',(req, res, next) => {
    const login_user = req.body;

    if(!login_user.name || !login_user.password){
      res.json({
        success:false,
        error:"Please include user name and password"
      });
    }
    else{
      
      User.findOne({"name":login_user.name},(err,data)=>{
      
        if(!data){
          res.json({
            success:false,
            error:"name doesn't exit"
          });
        }
        else{
          bcrypt.compare(login_user.password, data.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch){
              res.json({
                success:false,
                error:"Password doesn't match"
              });
            }
            else{
              let token = jwt.sign({username: login_user.name},
                config.secret,
                { expiresIn: '24h' // expires in 24 hours
                }
              );
              // return the JWT token for the future API calls
              res.json({
                success: true,
                msg: 'Authentication successful!',
                token,
                user:data
              });
            }
          });
          
          
        }
       
      });
     
    }
     
    
  });

  module.exports= router;