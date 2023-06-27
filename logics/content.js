import { client } from "../db.js";

export function getContent(req){
    return client.db("bwd45")
    .collection("movies")
    .find(req.query).toArray()
}