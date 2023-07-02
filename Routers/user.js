import express from 'express';
import {findUserbyId, genrateJwtToken, genrateResetToken, loginUser, signUpUser, updatePassword  } from '../logics/user.js';
import bcrypt from 'bcrypt';
import { mail } from '../logics/mailer.js';
// import transporter from '../logics/mailer.js';
 const router = express.Router();
 
router.post("/signup", async (req, res)=>{

   try {
    //check if the email is already registered
const newUser = req.body;

if(newUser.password === "" || newUser.email === ""){
    return res.status(400).json({data:{error:"Invalid details"}})    
}
const checkEmail = await loginUser(newUser.email)
if(checkEmail){
    return res.status(400).json({data:{error:"Sorry, Email already registered"}})
}
const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(newUser.password,salt)
const hashedUser = {...newUser,password:hashedPassword}
    const result = await signUpUser(hashedUser)
    res.status(200).json({data:{newUser:hashedUser,
        message:"SingUp successfull"}})   
   } catch (error) {
   console.log(error);
}
})

router.post("/login", async(req, res)=>{
    
    try {
const user = await loginUser(req.body.email);
 if(!user){
 return res.status(400).json({data:{error:"InValid Email, Please signup !"}})
    
 }
 const validatePass = await bcrypt.compare(req.body.password,user.password)
    
 if(!validatePass){
  return res.status(400).json({data:{error:"InCorrect Password"}})
 }
 const token = genrateJwtToken(user._id)
 res.status(200).json({data:{message:"successfully logged-In",token:token}})

    } catch (error) {
        console.log(error);
    }
})

router.post("/forget-password",async (req,res)=>{

try {
    const {email} = req.body;
    const user = await loginUser(email);
 if(user === null){
 return res.status(400).json({data:{error:"InValid Email, user:user"}})
 }
      const code = Math.round(Math.random()*1000+1111)
      mail(email,code);
      if(!code){
 return res.status(400).json({data:{error:"InValid code"}})
}
   res.status(200).json({data:{code:code,message:"verification email sent"}})   
     
} catch (error) {
    console.log(error);
    res.status(400).json({data:error})
}
})

router.post("/reset-password",async (req,res)=>{

    try {
        const {email,password,confirmPassword} = req.body
        const user = await loginUser(email);
        console.log(user)

if(password === "" ||  confirmPassword === ""){
  return res.status(400).json({data:{error:"invalid details"}})  
}
if(password !== confirmPassword) {
  return res.status(400).json({data:{error:"password doesnot match"}})  

}

const salt = await bcrypt.genSalt(10);

const newhashedPassword = await bcrypt.hash(password,salt)
const newhashedUser = {...req.body,password:newhashedPassword}
    const result = await updatePassword(email,newhashedUser)
    
    const token = genrateJwtToken(email)
    
    res.status(200).json({data:{newUser:result,
        message:" password successfully changed",token:token}})

    } catch (error) {
        console.log(error)
        res.status(400).json({data:{error:"code error"}})
    }
})

export const userRouter = router;