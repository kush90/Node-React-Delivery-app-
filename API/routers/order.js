var express = require('express');

var Order = require('../models/order');
var Customer = require('../models/customer');
var Thing = require('../models/thing');
let middleware = require('../middleware');
let config = require('../config');

var router = express.Router();

router.get('/',middleware.checkToken,(req,res)=>{

    Order.find({},(err,data)=>{
        if (err) throw err;
        res.json(data);
    });

});

// get the orders which are same townshop of pickup guy and customer who request order
router.get('/serach/by/today/:township',middleware.checkToken,(req,res)=>{
    
    today = new Date();
    var day = today.getDate()<10 ? '0'+today.getDate(): today.getDate();
    var month = today.getMonth()<10 ? '0'+today.getMonth():today.getMonth();
    var year = today.getFullYear();
    var township = req.params.township;
    var order_date = year+month+day;
   
    // var order_date = 20190229;
    
   
    Customer.find({"township":township}).lean().exec((err,customers)=>{
        if (err) throw err;

        if(customers.length==0){
            res.json({
                success:false,
                error:"Currently there are no customers yet"
            });
        }
        
        else{
            var CustomerIdsArr = customers.map(function(customer) {
                return customer._id;
            });
            
            
            Order.find({customer:{ $in: CustomerIdsArr},order_date:parseInt(order_date),status:null}).populate('customer').populate({ path: 'picker', select: ['name','phone_no','township','address'] }).exec(function(err,orders){
                if(err) throw err;
                if(orders.length>0){
                    res.json({
                        success:true,
                        orders
                    });
                }
                else{
                    res.json({
                        success:false,
                        error:"There are no orders yet"
                    });
                }
                
                
            });
        }        
        
    });
    
});

// change the stauts of orders by pickup guy
router.put('/:id/:status/:user',middleware.checkToken,(req,res)=>{
    Order.findById({_id:req.params.id}).exec((err,order)=>{

        if (err) throw err;
        var msg;
        if(!order){
             res.status(400).json({
                success:false,
                msg:"Order Not found",
                
            });   
        }
        else{
           
            today = new Date();
            const from = 'My app'
            const to = '959897692221'
            let text="";
            
            if(req.params.status=='assign'){
                order.status="assigned";
                msg = "You are successfully assinged to pick up";
                text= req.params.user+"will come to pick up your things (phone no):";
                order.picker=req.params.user;
                config.nexmo.message.sendSms(from, to, text);
            }
            else if(req.params.status=='pick-up'){
                order.status = "picked-up";
                order.pick_up_date = today;
                msg = "You are successfully picked up from customer";
            }
            else if(req.params.status=='check-in'){
                order.status = "checked-in";
                order.check_in_date = today;
                
                msg = "You are successfully checked in the branch";
            }
            else if(req.params.status=='delivering'){
                order.status = "delivering";
                order.deliver_date = today;
                order.deliverer=req.params.user;
                msg = "You are successfully assigned to deliver";
            }
            else if(req.params.status=='delivered'){
                order.status = "delivered";
               
                msg = "You are successfully delivered";
            }
            else{
                order.status=null
                msg=null
            }
           

           
            
            
            order.save();
            res.json({
                
                msg:msg,
                order

            });
        }

    })
});

// get today assigned orders according to pickeup'township
router.get('/serach/by/today/:township/:id/assigned',middleware.checkToken,(req,res)=>{
    
    today = new Date();
    var day = today.getDate()<10 ? '0'+today.getDate(): today.getDate();
    var month = today.getMonth()<10 ? '0'+today.getMonth():today.getMonth();
    var year = today.getFullYear();
    var township = req.params.township;
    var order_date = year+month+day;
   
    // var order_date = 20190229;
    
   
    // Customer.find({"township":township}).lean().exec((err,customers)=>{
    //     if (err) throw err;

        // if(customers.length==0){
        //     res.json({
        //         success:false,
        //         error:"Currently there are no customers yet"
        //     });
        // }
        
        // else{
            // var CustomerIdsArr = customers.map(function(customer) {
            //     return customer._id;
            // });
            
            
            Order.find({picker:req.params.id,order_date:parseInt(order_date),status:"assigned"}).populate('customer').populate({ path: 'picker', select: ['name','phone_no','township','address'] }).exec(function(err,orders){
                if(err) throw err;
                if(orders.length>0){
                    res.json({
                        success:true,
                        orders
                    });
                }
                else{
                    res.json({
                        success:false,
                        error:"There are no assigned orders yet"
                    });
                }
                
                
            });
        // }        
        
    // });
    
});

// get today pickedup orders according to pickeup'township
router.get('/serach/by/today/:township/:id/picked-up',middleware.checkToken,(req,res)=>{
    
    today = new Date();
    var day = today.getDate()<10 ? '0'+today.getDate(): today.getDate();
    var month = today.getMonth()<10 ? '0'+today.getMonth():today.getMonth();
    var year = today.getFullYear();
    var township = req.params.township;
    var order_date = year+month+day;
   
   
            
            Order.find({picker:req.params.id,order_date:parseInt(order_date),status:"picked-up"}).populate('customer').populate({ path: 'picker', select: ['name','phone_no','township','address'] }).exec(function(err,orders){
                if(err) throw err;
                if(orders.length>0){
                    res.json({
                        success:true,
                        orders
                    });
                }
                else{
                    res.json({
                        success:false,
                        error:"There are no pickedup orders yet"
                    });
                }
                
                
            });
      
    
});

// get today check-in orders according to delivery man's township
router.get('/serach/by/today/:township/checked-in',middleware.checkToken,(req,res)=>{
    
    today = new Date();
    var day = today.getDate()<10 ? '0'+today.getDate(): today.getDate();
    var month = today.getMonth()<10 ? '0'+today.getMonth():today.getMonth();
    var year = today.getFullYear();
    var township = req.params.township;
    var order_date = year+month+day;
   
    
            
            
            Order.find({status:"checked-in",order_date:parseInt(order_date)}).populate('customer').populate({ path: 'picker', select: ['name','phone_no','township','address'] }).exec(function(err,orders){
                if(err) throw err;
                if(orders.length>0){
                    
                    var OrderIdsArr = orders.map(function(order) {
                        return order._id;
                    });
                    Thing.find({order:{ $in: OrderIdsArr}}).exec(function(err,things){
                        if(err) throw err;
                        if(orders.length>0){
                            res.json({
                                success:true,
                                things
                                
                            });
                        }
                        else{
                            res.json({
                                success:false,
                                error:"There are no delivery yet"
                            });
                        }
                        
                        
                    });
                   
                }
                else{
                    res.json({
                        success:false,
                        error:"There are no delivery"
                    });
                }
                
                
            });
    
    
});

// get today delivering orders according to delivery man's township
router.get('/serach/by/today/:township/delivering',middleware.checkToken,(req,res)=>{
    
    today = new Date();
    var day = today.getDate()<10 ? '0'+today.getDate(): today.getDate();
    var month = today.getMonth()<10 ? '0'+today.getMonth():today.getMonth();
    var year = today.getFullYear();
    var township = req.params.township;
    var order_date = year+month+day;
   
    
            
            
            Order.find({status:"delivering",order_date:parseInt(order_date)}).populate('customer').populate({ path: 'picker', select: ['name','phone_no','township','address'] }).exec(function(err,orders){
                if(err) throw err;
                if(orders.length>0){
                    
                    var OrderIdsArr = orders.map(function(order) {
                        return order._id;
                    });
                    Thing.find({order:{ $in: OrderIdsArr}}).exec(function(err,things){
                        if(err) throw err;
                        if(orders.length>0){
                            res.json({
                                success:true,
                                things
                                
                            });
                        }
                        else{
                            res.json({
                                success:false,
                                error:"There are no delivering orders yet"
                            });
                        }
                        
                        
                    });
                   
                }
                else{
                    res.json({
                        success:false,
                        error:"There are no delivering orders yet"
                    });
                }
                
                
            });
    
    
});

module.exports=router;