const express = require("express")
const rateLimit = require("express-rate-limit")
const app = express();
app.use(express.json());

otpstore = {} //store otp

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
const passwordResetLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

//create otp
app.post('/otp',limiter,(req,res)=>{
    const {email }= req.body;
    if(!email){
        return res.status(400).json({
            message:"please enter a valid email"
        })
    }
    const otp = Math.floor(100000 + Math.random()*900000).toString();
    otpstore[email] = otp;
    console.log(`OTP for ${email} :${otp}`);
    res.status(200).json({
        message:"Otp has been sent"
    });
})

//password reset 
app.post('/reset',passwordResetLimiter,(req,res)=>{
    const{email , otp , newpassword} = req.body;
    if(!email || !otp || !newpassword){
        return res.status(400).json({
            message:'please enter all details'
        })
    }
    if(otpstore[email] && otpstore[email] === otp){
        console.log(`Password for ${email} has been change to ${newpassword}`);
        delete otpstore[email];
        res.status(200).json({
            message:"password reset successfully"
        })
    }else{
        res.status(401).json({
            message:"Invalid Otp"
        });
    }
})




app.listen(8000,()=>{
    console.log("server is running on http://localhost:8000")
});