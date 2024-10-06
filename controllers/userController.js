const User = require("../models/userModel");


const loadRegister = async(req, res)=>{
    try{
        res.render('signup',{message:req.session.message
        });
    }catch(error){
        console.log(error.message);
    }
}

const insertUser = async(req,res)=>{
    try{
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            is_admin:0
        })
        const userData = await user.save();
        if(userData){
            req.session.message = '';
            res.redirect('/');
        }else{
            req.session.message = "unable to register user";
            res.redirect('/signup')
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    loadRegister,
    insertUser
}