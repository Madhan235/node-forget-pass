import express from "express";
import { userRouter } from "./Routers/user.js";
import dotenv from "dotenv";
import { contentRouter } from "./Routers/content.js";
import {isAuthenticated} from "./Authentication/auth.js";

dotenv.config();
// initializing server 
const app = express();

//middleware;
app.use(express.json());

 app.use("/users", userRouter)
 app.use("/movies",isAuthenticated, contentRouter)


// starting the app
app.listen(9001,()=>{
    console.log("localhost listening on 9001")
})