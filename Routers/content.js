import express from 'express';
import { getContent } from '../logics/content.js';


const router = express.Router();

router.get("/all", async (req,res)=>{
try {
    const movies = await getContent(req);
    if(movies.length <= 0){
       return res.status(400).json({data:{message:"No collection found"}})
    }
    res.status(200).json({data:movies});
} catch (error) {
    console.log(error)
}
})

export const contentRouter = router;