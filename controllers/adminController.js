const User = require('../models/userModel');
const auth = require('../auth/auth');
const bcrypt = require('bcrypt')
// for loading login page
const loadLogin =async (req, res) => {
    try {
        res.render('login', {title:"Admin Login", message:req.session.admin?.message})
    } catch (err) {
        console.log(err)
    }
}

// for authenticating admin

const verifyLogin = async (req,res)=>{
    try{
        req.session.admin ??= {}
        const {email, password} = req.body
        const userData = await User.findOne({email});
        if(userData){
            const passwordMatch = await bcrypt.compare(password, userData.password);
            // checking for password match
            if(passwordMatch){
                // checkig if this is an admin or not
                if(userData.is_admin){
                    req.session.admin.message = null;
                    req.session.admin.email = userData.email;
                    req.session.admin.username = userData.username;
                    res.redirect('/admin');
                }else{
                    req.session.admin.message = "You dont have admin rights";
                    res.redirect('/admin/login');
                }
            }else{
                req.session.admin.message = "Password is wrong";
                res.redirect('/admin/login');
            }
        }else{
            req.session.admin.message = "User not found";
            res.redirect('/admin/login');
        }
    }catch(err){
        console.log(err)
    }
}

const loadHome = async(req,res)=>{
    try{
        const email = req.session.admin?.email;
        const userData  = await User.findOne({email});
        res.render('home', {title:"Admin DashBoard"})
    }catch(err){
        console.log(err)
    }
}

const logout = async(req,res)=>{
    try{
        req.session.admin = null;
    }catch(err){
        console.log(err)
    }
}
module.exports = {
    loadLogin,
    verifyLogin,
    loadHome
}