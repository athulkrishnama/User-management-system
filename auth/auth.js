const checkLogin = (req, res, next)=>{
    if(req.session.username){
        res.redirect('/');
    }else{
        next();
    }
}

const checkLogout = (req, res, next)=>{
    if(req.session.username){
        next();
    }else{
        res.redirect('/login');
    }

}

module.exports = {
    checkLogin,
    checkLogout
}