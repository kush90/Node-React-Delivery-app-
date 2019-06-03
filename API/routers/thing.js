const express = require('express');
const router = express.Router();


var Thing = require('../models/thing');
let middleware = require('../middleware');

router.get('/',(req,res)=>{
    Thing.find({},(err,data)=>{
        if(err) throw err;
        res.json({
            success:true,
            data
        });
    });
});

router.post('/',middleware.checkToken,(req,res)=>{
   
    let thing = new Thing({
        name:req.body.name,
        info:req.body.info,
        receiver:{
            name:req.body.receiver.name,
            phone_no:req.body.receiver.phone_no,
            township:req.body.receiver.township,
            address:req.body.receiver.address,
        },
        price:req.body.price,
        order:req.body.order

    });
    
    thing.save((err)=>{
        if (err) throw err;
        res.json({
            success:true,
            msg:"Thing is successfully picked up"
        });
    });
});

module.exports= router;