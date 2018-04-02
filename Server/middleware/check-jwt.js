import { decode } from 'punycode';

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next){
    let token = req.headers['Authorization'];

    if(token)
    {
        jwt.verify(token,config.secret,function(err, decoded){
            if(err)
            {
                res.json({
                    success:false,
                    message:'Failed to Authenticate token'
                });
            }
            else
            {
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(403).json({
            success:false,
            message: 'No token provided'
        });
    }

}