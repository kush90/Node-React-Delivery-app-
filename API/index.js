var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
mongoose.connect('mongodb://127.0.0.1:27017/myapp',{ useNewUrlParser: true });

var app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


// api routes
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/customers/',require('./routers/customer'));
app.use('/api/users/',require('./routers/user'));
app.use('/api/things/',require('./routers/thing'));
app.use('/api/orders/',require('./routers/order'));



app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is listening the port of ${PORT}`);
});