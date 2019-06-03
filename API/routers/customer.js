var express = require('express');

var Customer = require('../models/customer');
var Order = require('../models/order');
let middleware = require('../middleware');

var router = express.Router();



// get all customers
router.get('/',middleware.checkToken,(req,res)=>{
    Customer.find({},(err,data)=>{
        if (err) throw err;
        res.json(data);
    })
});

// create a customer
// check whether the customer's phone no is already taken or not
router.post('/',(req,res)=>{
    const newCustomer = req.body;
    var today= new Date();

    newCustomer.created_date=today;
    if(!newCustomer.name || !newCustomer.phone_no || !newCustomer.township || !newCustomer.address ){
        res.json({
            success:false,
            error:"Please fill the name, phone number,township and address"
        });
    }
    
    else{
        Customer.find({"phone_no":newCustomer.phone_no},(err,data)=>{
            if (err) throw err;
            if(data.length>0){
                res.send({
                    success:false,
                    error:"This phone number is already taken"
                });
            }
            else{
            let customer = new Customer(newCustomer);
            customer.save();
            let order = new Order({
                customer:customer._id,
                order_date:today,
            
            });
            order.save();
            res.json({
                success:true,
                newCustomer
            });
            }
        });  
    }
   
});

// get a customer by id
router.get('/:id',middleware.checkToken,(req,res)=>{
    Customer.findById({"_id":req.params.id}).lean().exec((err,data)=>{
        if (err) throw err;
        if(!data){
            return res.json({
                success:false,
                error:`No customer found by the township of ${req.params.id}`
            });
        }
        res.json(data);
    });
});

// update a customer 
router.put('/:id',(req,res)=>{
    Customer.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,data)=>{
        if (err) throw err;
        if(!data){
            return res.json({
                success:false,
                error:`No customer found by the id of ${req.params.id}`
            });
        }
        res.json({
            success:true,
            data
        });
    });
    
    
});

//delete a customer
router.delete('/:id',(req,res)=>{
    Customer.findByIdAndDelete(req.params.id,(err,data)=>{
        if (err) throw err;
        if(!data){
            return res.json({
                success:false,
                error:`No customer found by the id of ${req.params.id}`
            });
        }
        res.send({
            success:true,
            msg:'Successfully deleted'
        });
    });
});

// get a customer by township
router.get('/search/:township',middleware.checkToken,(req,res)=>{
    let date = new Date();
        
    Customer.find({"township":req.params.township},(err,data)=>{
        if (err) throw err;
        if(data.length==0){
            return res.json({
                success:false,
                error:`No customer found by the township of ${req.params.township}`
            });
        }
        res.json({
            success:true,
            data
        });
    });
});

// make order request by registered customer
router.get('/create/order/:phone_no',(req,res)=>{
    Customer.find({"phone_no":req.params.phone_no},(err,customer)=>{
        if (err) throw err;
        if(customer.length>0){
            var today= new Date();
            var order = new Order({
                customer:customer[0]._id,
                order_date:today,
            
            });
            order.save();
            res.json({
                success:true,
                customer,
                order
            });
        }else
        {
            res.json({
                success:false,
                msg:"This phone number of customer is not found"
            });
        }
    })
});

module.exports= router;
