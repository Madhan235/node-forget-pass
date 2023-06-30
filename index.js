import express from "express";
import { userRouter } from "./Routers/user.js";
import dotenv from "dotenv";
import { contentRouter } from "./Routers/content.js";
import {isAuthenticated} from "./Authentication/auth.js";
import cors from "cors"
import nodemailer from "nodemailer";
dotenv.config();
// initializing server 
const app = express();

//middleware;
app.use(express.json());
app.use(cors());

 app.use("/users",userRouter)
 app.use("/movies",isAuthenticated, contentRouter)


//  let transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"msouljar@gmail.com",
//         pass:"yhqilsstocvicqoc"
//     },
// });

//  let mailDetails = {
//     from:"msouljar@gmail.com",
//     to:"mathanmarquez93@gmail.com",
//     subject:"nodemailer",
//     text:"code"

//  }

//  transporter.sendMail(mailDetails, function(err){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("email sent successfully")
//     }
//  });


// starting the app
app.listen(9001,()=>{
    console.log("localhost listening on 9001")
})