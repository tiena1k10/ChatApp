const { response } = require("express");
const axios = require("axios").default;
const dayjs = require("dayjs");
module.exports = function (io) {
  var allUsers = [];
  var allClient = [];
  io.sockets.on("connection", (socket) => {
    //listen user
    socket.on("adduser", (fullname) => {
      // save
      allUsers.push(fullname);
      allClient.push(socket);
      socket.fullname = fullname;
      // notify to this user
      var data = {
        sender: "SERVER",
        message: "Join the chat room successfully",
        time: getTime(),
      };
      socket.emit("update_noti", data);
      socket.emit("update_list_user", allUsers);
      // notyfy to another user
      var data = {
        sender: "SERVER",
        message: fullname + " join",
        time: getTime(),
      };
      socket.broadcast.emit("update_noti", data);
      socket.broadcast.emit("update_list_user", allUsers);
    });
    // disconect
    socket.on("disconnect", function () {
      var data = {
        sender: "SERVER",
        message: socket.fullname + " left",
        time: getTime(),
      };
      socket.broadcast.emit("update_noti", data);
      //
      var i = allClient.indexOf(socket);
      allClient.splice(i, 1);
      allUsers.splice(allUsers.indexOf(socket.fullname), 1);
      socket.broadcast.emit("update_list_user", allUsers);
    });
    // user send chat
    socket.on("client_send_mess_to_server", (message) => {
      // noti another
      var data = {
        sender: socket.fullname,
        content: message,
        time: getTime(),
      };
      socket.broadcast.emit("update_log_chat_from_people", data);
      socket.emit("update_log_chat_from_yourself", data);
    });

    ///=============================simsimi=========================//
    socket.on("user_ask_sim", async (text) => {
      try {
        //const response = await axios.get(`https://simsimi.info/api/?text=${text}&lc=vn`);
        //const response = await axios.get(`https://tuanxuong.com/api/simsimi/index.php?text=${text}`);
        const URI = `https://api.simsimi.net/v2/?text=${text}&lc=vn&cf=false`;
        const encodedURI = encodeURI(URI);
        const response = await axios.get(encodedURI);
        if (
          response.data.success ===
          "Tôi không biết bạn đang nói gì. Hãy dạy tôi"
        ) {
          response.data.success = "Tôi không biết bạn đang nói gì. Hãy dạy tôi";
        }
        var data = {
          sender: "Simsimi",
          content: response.data.success,
          time: getTime(),
        };
        socket.emit("sim_anwser", data);
      } catch (error) {
        console.log(error.message);
        var data = {
          sender: "Simsimi",
          content: "Huhu tôi bị lỗi rồi",
          time: getTime(),
        };
        socket.emit("sim_anwser", data);
      }
    });
  });
};
function getTime() {
  // get time format HH:MM tz Asia/Ho_Chi_Minh
  return dayjs().format("HH:mm");
}
// hiccac =>
