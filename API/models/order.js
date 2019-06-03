const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);

let orderSchema = new mongoose.Schema({

        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Customer',
            required:true
        },
        order_date:{
                type:DateOnly,
                default:null
        },
        status:{
            type:String,
            default:null
        },
        picker:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null,
        
        },
        deliverer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null,
            
        },
        pick_up_date:{
            type:DateOnly,
            default:null
        },
        check_in_date:{
            type:DateOnly,
            default:null
        },
        deliver_date:{
           type:DateOnly,
           default:null
        },
        

});
let Order = mongoose.model('Order',orderSchema,'orders');
module.exports=Order;