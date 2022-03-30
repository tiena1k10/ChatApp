
const PORT = require("../app.js");

module.exports.chatroom_get = (req,res)=>{
    console.log(PORT.PORT);
    res.render("chatroom2");
}