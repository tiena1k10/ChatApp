const User = require("../models/User");


const handleError = (err=>{
    console.log("code : " + err.code);
    console.log("Message : "  + err.message);
    console.log("Name : "  + err.name);

    var error = {fullname:"",email: "",password:""};
    if (err.name === 'MongoError' && err.code === 11000) {
       error.email = "This email is already being used";
    }
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path]= properties.message;
        });
    }
    return error;

});


module.exports.singup_get = (req,res)=>{
    res.render("signup");
}
module.exports.login_get = (req,res)=>{
    res.render("login");
}
module.exports.singup_post = async (req,res) =>{
    const {fullname,email,password} = req.body;
    try{
        const user = await User.create({fullname,email,password});
        res.status(201).json(user);
        return;
    } catch (err) {
        const temp = handleError(err);
        res.json({temp});
    }
}
module.exports.login_post = async (req,res)=>{
    res.send("post_login");
}
