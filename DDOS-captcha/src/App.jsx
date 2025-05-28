import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import axios from "axios"
import './App.css'

function App() {
  const [otp,setOtp]=useState("");
  const [newpassword , setNewpassword]=useState("");
  const [token,setToken]=useState('');
  const [status , setStatus]=useState('');

  const handleSubmit=async ()=>{
    if(!token){
      setStatus("please complete CAPTCHA");
    }
  
  try{
    const response = await axios.post("http://localhost:8000/reset",{
      email:"anish@gmail.com",
      otp: otp,
      newpassword :newpassword,
      token:token,

    });
    setStatus('password updated successfully');

  }catch(error){
    setStatus("Failed to update password . Please try again");
  }
}
return(
  <div>
    <input
    placeholder='otp'
    value={otp}
    onChange={(e)=> setOtp(e.target.value)}
    className='input'
    />
    <input
    placeholder='newpassword'
    type='password'
    value={newpassword}
    onChange={(e)=> setNewpassword(e.target.value)}
    className='newpassword'
    />

    <Turnstile
    siteKey='0x4AAAAAABe44sqQp0igJonQ'
    onSuccess={(token)=>setToken(token)}
    />
    <button onClick={handleSubmit} className='update-button'>
      update password

    </button>
  </div>
)

}


export default App
