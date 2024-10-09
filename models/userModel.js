const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true
    },
    // mobile: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Number,
        required: true
    },
    is_verified: {
        type: Number,
        required: false
    },

})


module.exports = mongoose.model('User', userSchema);