const express = require('express')
const app = express()
const homeRouters = require('./Routes/Home')
const apiRouters = require('./Routes/Api')

app.use('/home', homeRouters)

app.use('/api', apiRouters)

app.listen(3000, () => {
    console.log("Server Listnng on http://localhost:3000");

})

