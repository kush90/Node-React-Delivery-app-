let mongoose = require('mongoose');

let thingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true // cut space
    },
    info: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required:true
    },
    receiver:{
            name:{
                type:String,
                required:true,
                trim:true,
            },
            phone_no:{
                type:String,
                required:true,
                trim:true
            },
            township:{
                type:String,
                required:true,
                trim:true,
            },
            address:{
                type:String,
                required:true,
                trim:true
            }
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default:null,
        
    },
    
    
    
});

let Thing = mongoose.model('Thing',thingSchema,'things');
module.exports = Thing;