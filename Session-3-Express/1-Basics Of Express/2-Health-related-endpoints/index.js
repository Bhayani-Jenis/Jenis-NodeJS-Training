const express = require('express')
const app = express()
require('dotenv').config()

app.get("/health", (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    })
})

app.get("/info", (req, res) => {
    res.json({
        node: process.version,
        platform: process.platform
    })
})

app.get('/env',(req,res)=>{
    res.json( { environment: process.env.NODE_ENV || 'development' })
})


app.listen(3000, () => {
    console.log("Server Listnng on http://localhost:3000");
})