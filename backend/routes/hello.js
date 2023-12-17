const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.send("hi! I am here");
})
module.exports=router;