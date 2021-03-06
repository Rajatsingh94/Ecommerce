const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const app = express();



//mongoose connection

mongoose.connect(config.database, (err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('Connected to database');
    }
})

//middleware

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(cors());

//routes
const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');

app.use('/api', mainRoutes);
app.use('/api/accounts',userRoutes);
app.use('/api/seller', sellerRoutes);


//server creation

app.listen(config.port,err=>{
    console.log('Server listening on '+ config.port);
});
