const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/signup")
.then(()=>{console.log("db connected")})
.catch(()=>{
    console.log("failed db")
})

const LoginSchema=new mongoose({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model('collection1',LoginSchema)
module.exports=collection