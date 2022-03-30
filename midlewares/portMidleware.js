module.exports.getPort = (req,res,next)=>{
    const PORT = require("../app.js");
    res.locals.PORT = PORT.PORT;
    next();
}