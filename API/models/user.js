const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone_no:{
    type:String,
    required:true,
    trim:true
  },
  township: {
    type: String,
    required: true
  },
  address:{
    type:String,
    required:true,
    trim:true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  
});

const User = mongoose.model('User', UserSchema,'users');
module.exports = User;