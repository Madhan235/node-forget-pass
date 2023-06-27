import express from 'express';
import {genrateJwtToken, loginUser, signUpUser  } from '../logics/user.js';
import bcrypt from 'bcrypt';

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

router.post("/login",async(req, res)=>{
    
    try {
        
        const logUser = req.body;
        const user = await loginUser(logUser.email);
        if(!user){
            return res.status(400).json({data:{message:"InValid Email, Please signup !"}})
    
        }
        const validatePass = await bcrypt.compare(logUser.password,user.password)
    
        if(!validatePass){
            return res.status(400).json({data:{message:"InCorrect Password"}})
        }
        const token = genrateJwtToken(user._id)
        res.status(200).json({data:{message:"succefully logged-In",token:token}})

    } catch (error) {
        console.log(error);
    }
})
export const userRouter = router;