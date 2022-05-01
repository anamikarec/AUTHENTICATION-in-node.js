const express = require('express')
const app = express()
const connect = require('./app/config/db')
const UserRouter = require('./app/routes/user.route')
require('dotenv').config();

app.use(express.json());
app.use("/",UserRouter);
const PORT = process.env.PORT || 5001;
const start = async() => {
    await connect();
    
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    })
}

module.exports = start;