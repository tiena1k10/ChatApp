const fullname = document.getElementById("fullname-header").textContent;
  var socket = io.connect("http://localhost:3000/");
  socket.on("connect", ()=>{
    socket.emit("adduser",fullname);
    document.querySelector(".chat_list").innerHTML +=
    '<div class="chat_list active_chat"><div class="chat_people"><div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div><div class="chat_ib"><div class="chat_name"><b>'+fullname+'</b></div></div></div></div>'
  })

  // listen update_mess event
  socket.on("update_mess", data=>{
    document.getElementById("list-mess").innerHTML +=  
    "<li><b>" + data.sender + ": </b>"+data.message+"</li>";
    
  })
console.log("123");