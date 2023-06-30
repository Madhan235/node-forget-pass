import {client, objectId} from "../db.js";
import jwt from "jsonwebtoken"

export function signUpUser(data){
return client.db("bwd45")
.collection("users")
.insertOne(data)
}

export function loginUser(userEmail){
return client.db("bwd45")
.collection("users")
.findOne({email:userEmail})
}

export function genrateJwtToken(id){
    return jwt.sign({id},"secretkey", {expiresIn:"30d"})
}
export function genrateResetToken(email){
    return jwt.sign({email},"secretkey", {expiresIn:"5m"})
}

export function updatePassword(email,newpassword){
return client.db("bwd45")
.collection("users")
.findOneAndUpdate({email:email},{$set:{password:newpassword}})
}