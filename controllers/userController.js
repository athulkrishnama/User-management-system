const User = require("../models/userModel");
const bcrypt = require("bcrypt")

const securePassword = async(password)=>{
    try{    
        // console.log(password)
        const hashedPass = await bcrypt.hash(password, 10);
        return hashedPass;
    }catch(err){
        console.log(err);
    }
}

const loadRegister = async(req, res)=>{
    try{
        res.render('signup',{message:req.session.message});
    }catch(error){
        console.log(error.message);
    }
}

const insertUser = async(req,res)=>{
    try{
        const  hashedPass = await securePassword(req.body.password)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass,
            is_admin:0
        })
        const userData = await user.save();
        if(userData){
            req.session.message = '';
            req.session.username = userData.name;
            req.session.email = userData.email;
            res.redirect('/');
        }else{
            req.session.message = "unable to register user";
            res.redirect('/signup')
        }
    }catch(error){
        if(error.errorResponse.code == 11000){
            req.session.message = "This email is already registered";
            res.redirect('/signup');
        }
    }
}

module.exports = {
    loadRegister,
    insertUser
}