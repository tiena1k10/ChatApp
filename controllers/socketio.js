const { response } = require('express');
const axios = require('axios').default;

module.exports = function (io){
   var allUsers =[];
    var allClient = [];
    io.sockets.on("connection", socket=>{
        console.log("have a new user connected");
        //listen user
        socket.on("adduser",fullname=>{
            // save
            allUsers.push(fullname);
            allClient.push(socket);
            socket.fullname = fullname;
            // notify to this user
            var data = {
                sender:"SERVER",
                message:"You have join chat room",
                time: getTime(),
            };
            socket.emit("update_noti",data);
            socket.emit("update_list_user",allUsers);
            // notyfy to another user
            var data = {
                sender:"SERVER",
                message: fullname + " join",
                time: getTime(),
            };
            socket.broadcast.emit("update_noti",data);
            socket.broadcast.emit("update_list_user",allUsers);
        })
        // disconect
        socket.on('disconnect', function() {
            var data = {
                sender:"SERVER",
                message: socket.fullname + " left",
                time: getTime(),
            };
            socket.broadcast.emit("update_noti",data);
            //
            var i = allClient.indexOf(socket);
            allClient.splice(i, 1);
            allUsers.splice(allUsers.indexOf(socket.fullname),1);
            socket.broadcast.emit("update_list_user",allUsers);
         });
         // user send chat
        socket.on("client_send_mess_to_server",message=>{
            // noti another
            var data = {
                sender: socket.fullname,
                content: message,
                time: getTime()
            }
            socket.broadcast.emit("update_log_chat_from_people",data);
            socket.emit("update_log_chat_from_yourself",data);
        })




        ///=============================simsimi=========================//
        socket.on("user_ask_sim", async text=>{
            try {
                //const response = await axios.get(`https://simsimi.info/api/?text=${text}&lc=vn`);
                //const response = await axios.get(`https://tuanxuong.com/api/simsimi/index.php?text=${text}`);
                const URI = `https://api.simsimi.net/v2/?text=${text}&lc=vn&cf=false`;
                const encodedURI = encodeURI(URI);
                const response = await axios.get(encodedURI);
                if(response.data.success==="Tôi không biết bạn đang nói gì. Hãy dạy tôi"){
                    response.data.success="Mày nói cái đéo gì thế ?";
                }
                var data = {
                    sender:"Simsimi",
                    content: response.data.success,
                    time:getTime()
                }
                socket.emit("sim_anwser",data);
              } catch (error) {
                var data = {
                    sender:"Simsimi",
                    content: "tao đơ rồi, nói cái gì cơ ?",
                    time:getTime()
                }
                socket.emit("sim_anwser",data);
              }
        })
    });
    
}
function getTime(){
    var today = new Date();
    var a = (today.getHours() + 7)%24;
    var time = a + ":" + today.getMinutes();
    return time;var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    return time;
}
// hiccac => 