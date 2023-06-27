import { MongoClient } from "mongodb";
import obj from "mongodb";

const mongoUrl ="mongodb+srv://MadhanR:Madhan23@cluster0.diey8bl.mongodb.net"
async function createConnection(){
    const client = new MongoClient(mongoUrl)
await client.connect();
console.log("mongodb server connected successfully"); 
 return client;
}
export var objectId = obj.ObjectId;
export const client = await createConnection();