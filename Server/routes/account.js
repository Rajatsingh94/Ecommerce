const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

router.post('/signup',(req,res,next)=>{
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({email: req.body.email},(err, existingUser)=>{
        if(existingUser)
        {
            res.json({
                success: false,
                message: 'User Account already exist'
            })
        }
        else{
            user.save();

            var token = jwt.sign({
                user:user
            },config.secret,{
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message:'Enjoy token',
                token: token
            });
        }



    });

});

router.post('/login',(req,res,next)=>{

    User.findOne({email: req.body.email},(err,user)=>{

        if(err) throw err;

        if(!user)
        {
            res.json({
                success:false,
                message:'Authentication failed, Wronf password'
            });
        }else if(user)
        {
            var password = User.comparePassword(req.body.password);
            if(!password)
            {
                res.json({
                    success:false,
                    message:'Password didnt match, type again'
                });
            }
            else
            {
                var token = jwt.sign({
                    user:user
                },config.secret,{
                    expiresIn: '7d'
                });

                res.json({
                    success:true,
                    message:'Enjoy ur token',
                    token:token
                });
            }


        }


    })


});






module.exports = router;
