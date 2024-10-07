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

const loadLogin = async(req, res)=>{
    try{
        res.render('login', {message:req.session.message})
    }catch(err){
        console.log(err)
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

const verifyUser = async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({email:email});

        // checking if user exixts or not
        if(userData){
            if(await bcrypt.compare(password, userData.password)){
                req.session.message = '';
                req.session.username = userData.username;
                req.session.email = userData.email;
                res.redirect('/');
            }else{
                req.session.message = "password is not matching";
                res.redirect('/login');
            }
        }else{
            req.session.message = "User not found";
            res.redirect('/login');
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loadLogin,
    verifyUser,
}