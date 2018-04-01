const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const crypto = require('crypto');

const UserSchema = new Schema({

    email: {type: String, unique: true, lowercase: true},
    password: String,
    picture: String,
    isSeller: {type: boolean, default: false},
    address:{
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalcode: String
    },

    created:{type:Date, default:Date.now}


});

UserSchema.pre('save', function(next){

    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash('password', function(err){
        if(err)
        {
            return next(err);
        }
        user.password = hash;
        next();
    });

})

UserSchema.methods.comparePassword = function(password)
{
    return bcrypt.compareSync(password,this.password);
};

UserSchema.methods.gravatar = function(size)
{
    if(!size) return size=200;

    if(!email){

        return 'https://gravatar.com/avatar/?s' + size + '&d=retro';

    }
    else{

        var md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/'+ md5 + '?s'+ size + '&d=retro';
    }
};