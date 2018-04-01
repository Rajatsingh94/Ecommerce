const mongoose = require('mongoose');
const Schema = mongoose.Schema();

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