const express=require("express");
const Notes = require('../Models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

const router=express.Router();
router.get('/fetchnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
            res.status(500).send("some error occured");
    }
})
//route to add notes

router.post('/addnotes',fetchuser,[
    body('title','enter valid title').isLength({min:3}),
    body('description','enter description').isLength({min:5}),
    body('tag','enter tag').isLength({min:4})
    ],
    async(req,res)=>{
        const{title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });}
          try {
              const note=new Notes(
                  {title,description,tag,user:req.user.id}
              )
              const savenote=await note.save();
              console.log(savenote);
              res.json(savenote);
            
          } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
          }
    })
    router.put('/updateuser/:id',fetchuser,async(req,res)=>{
        const {title,description,tag}=req.body;
        const newnote={};
        if(title){newnote.title=title}
        if(description){newnote.description=description}
        if(tag){newnote.tag=tag}
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found");
        }
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("not allowed");
        }
        note=await Notes.findByIdAndUpdate(req.params.id, {$set:newnote},{new:true})
        res.json(note);

    })
    
    router.delete('/deleteuser/:id',fetchuser,async(req,res)=>{
        const {title,description,tag}=req.body;
       try {
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed");
        }
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "note has been deleted", note:note});
        
       } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).send("some error occured");
       }
        

    })
module.exports=router;
