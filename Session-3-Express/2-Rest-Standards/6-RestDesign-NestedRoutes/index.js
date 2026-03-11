const express = require('express')
const app = express()
const libraryRouters=require('./Routes/libraryRoutes')
app.use(express.json())
app.use('/api',libraryRouters)



app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
});