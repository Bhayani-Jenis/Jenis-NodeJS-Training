const express=require('express')

const app=express()

app.get("/",(req,res)=>{
    res.send("Welcome To Express")
})

app.get("/about",(req,res)=>{
    res.json({ name: 'My API', version: '1.0' })
})


app.listen(3000,()=>{
    console.log("Server Listnng on http://localhost:3000");
})