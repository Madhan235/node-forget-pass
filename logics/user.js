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
    return jwt.sign({id},process.env.secretKey, {expiresIn:"30d"})
}