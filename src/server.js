'use strict'

const express = require('express');
const app = express();
require('dotenv').config()
const usersRoute = require('./routes/users.route')
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute)


function start() {
    app.listen(PORT, ()=>{
        console.log(`listining to ${PORT}`);
    })
    
}

module.exports = {
    app,
    start
}