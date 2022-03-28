module.exports.singup_get = (req,res)=>{
    res.render("signup");
}
module.exports.login_get = (req,res)=>{
    res.render("login");
}
module.exports.singup_post = (req,res)=>{
    console.log(req.body);
    res.send("post_signup");
}
module.exports.login_post = (req,res)=>{
    res.send("post_login");
}
