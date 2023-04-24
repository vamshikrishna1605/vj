const express=require('express')
const app=express()
const path=require("path")
const ejs=require("ejs")
const templatepath=path.join(__dirname,'../templates')
app.use(express.json())
app.set("view engine","ejs")
const collection=require('./mongodb')
app.set('views',templatepath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render('signup')
})
app.post("/signup",async(req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password

    }
await collection.insertMany(data)
res.render("home")

})
app.post("/login",async(req,res)=>{

try {
    const check=await collection.findOne({
        name:req.body.name
    })
    if(check.password===req.body.password){
        res.render("home")
    }
    else{
        res.send("wrong password")
    }



} catch (error) {
    res.send("wrong details")
    
}
})

app.listen(8500,()=>{
    console.log("port connected")
})