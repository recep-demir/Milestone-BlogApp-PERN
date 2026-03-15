"use strict";

const express = require("express");
const app = express();
const cors = require("cors");



app.use(cors());
app.use(express.json());



require('dotenv').config();
// const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// app.use(require('./src/middlewares/queryHandler'))


const { dbConnection } = require('./src/configs/dbConnection');
dbConnection().then(() => {
    // SADECE VERİLERİ YÜKLEMEK İSTEDİĞİNDE BU SATIRI AÇ:
    // require('./sync')(); 
});

app.all('/', (req, res) => {
  res.send({
    error: false,
    message: 'Welcome to Blog API',
    documents: {
      swagger: '/documents/swagger',
      json: '/documents/json',
    },
    user: req.user,
  });
});

app.use(require('./src/middlewares/authentication'))

app.use(require('./src/routes'));


app.use(require('./src/middlewares/errorHandler'))



app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))

//! Syncronization: (once run)
// require('./sync')()
