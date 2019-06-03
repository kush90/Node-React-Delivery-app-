const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    
    name: {
      type: String,
      required: true,
      trim: true // cut space
    },
    phone_no: {
      type: String,
      required: true,
      trim: true
    },
    township: {
      type: String,
      required:true,
      trim:true
    },
    address:{
      type:String,
      required:true,
    },
    created_date: { 
      type: Date,
      default:Date.now
       },
  });

var Customer = mongoose.model('Customer',CustomerSchema,'customers');
module.exports = Customer;