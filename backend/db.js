const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/Prcaticenotebook?readPreference=primary&directConnection=true&ssl=false";
const connectToMongo=()=>{
mongoose.connect(mongoURI).then(()=>{
console.log("Connected to Mongoose Sucessfully");
});
}

module.exports=connectToMongo;
