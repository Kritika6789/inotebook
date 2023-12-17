const express=require("express");
const User = require('../Models/User');
const bcrypt=require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_SECRET="Kriitika@564764jdjf";
const router=express.Router();
router.post('/createuser',[
body('name','enter valid name').isLength({min:3}),
body('email','enter valid email').isEmail(),
body('password','enter valid password').isLength({min:5})
],
async(req,res)=>{
    let success=false;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ success,errors: errors.array() });}
      try{
      let user=await User.findOne({email:req.body.email})
      if(user){
        success=false;
          return res.status(400).json({success,error:"sorry this email already exist"});
      }
      console.log(user);
      const salt=await bcrypt.genSalt(10);
      const secpassword=await bcrypt.hash(req.body.password,salt);
      user=await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secpassword,});
        const data={
          user:{
            id:user.id
          }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;

        console.log(authtoken);
        res.json({success,authtoken});
      }
        catch(error){
          success=false;
          console.error(success,error.message);
          res.status(500).send("some error occured");
        }
      // }).then(user => res.json(user))
      // .catch(err=>{console.log(err);
      // res.json({err:'Please enter valid data'})});
  
//     console.log(req.body);
//     const user=User(req.body);
//     user.save();

// res.send(req.body);
// res.json(req.body);
// res.json(req.body);
// obj={
//     "name":"kritika",
//     "id":1
// }
// res.json(obj);
})
//create login system or user ,login
router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password','password cannot be blank').exists()
  ],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({ success,errors: errors.array()});}
       const {email,password}=req.body; 
       try{
          const user=await User.findOne({email});
          if(!user){
            success=false;
            return res.status(400).json({success,err:"please enter correct email"})
          }
          const passwordcompare= await bcrypt.compare(password,user.password);
          if(!passwordcompare){
            success=false;
            return res.status(400).json({success,err:"Please enter correct password"});
          }
          const data={
              user:{
                id:user.id
              }
          }
          const authtoken=jwt.sign(data,JWT_SECRET);
          success=true;

          console.log(authtoken);
          res.json({success,authtoken});
       }
       catch(error){
        success=false;

        console.error(success,error.message);
        res.status(400).send("some error occured");
       }
    
    
    
    })
    //routr 3 for getting user information using authtoken
    router.post('/getuser',fetchuser,
      async(req,res)=>{
        try{
          const userid=req.user.id;
          const user=await User.findById(userid).select("-password");
          console.log(user);
         res.send(user);

        }catch(error){
          console.error(error.message);
          res.status(400).send("some error occured");
        }
      })
// router.get('/',(req,res)=>{
//     res.send("hi");
// })

module.exports=router;