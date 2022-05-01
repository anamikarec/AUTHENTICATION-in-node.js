const express = require('express')
const app = express()
const connect = require('./app/config/db')

require('dotenv').config();
const PORT = process.env.PORT || 5001;
const start = async() => {
    await connect();
    
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    })
}

module.exports = start;