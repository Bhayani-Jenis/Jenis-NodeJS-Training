const express = require('express')
const app = express()

const loggerMiddleware = (req, res, next) => {
    const start = Date.now()
    const ts = new Date().toISOString()
    res.on('finish', () => {
        const ms = Date.now() - start;
        // TODO: console.log the formatted line
        console.log(`[${ts}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}`);
    
    });
    next(); // always call next!
}

app.use(loggerMiddleware)

app.get('/', (req, res) => {
    res.status(200).json({msg:"hello express"})
})


app.listen(3000, () => {
    console.log("server running on http://localhost:3000");

})