//  const fetch = require('node-fetch');

// const text = "anh là ai ?";
// async function log(){
//     const response = await fetch(`https://simsimi.info/api/?text=${text}&lc=vn`);
//     const data = await response.json();

//     console.log(data.success);

// }
// module.exports.getReplyMess=(text)=>{
//     fetch(`https://simsimi.info/api/?text=${text}&lc=vn`)
//     .then(response=>{
//         return response.json();
//     })
//     .then(infor=>{
//         return infor.success;
//     })
//     .catch((err)=>{
//         return "loi roi"
//     })
// }
const axios = require('axios').default;
async function getUser(text) {
  text = text.replaceAll(' ', '%20');
  console.log(text);
    try {
      const response = await axios.get(`https://api.simsimi.net/v2/?text=${text}&lc=vn&cf=false`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  getUser("anh tiến đẹp chai");