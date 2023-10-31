const express = require('express');
const db = require('./database/config/db');
const acknowledgmentRouter = require('./api/routes/acknowledgmentRouter');
const app = express();
const dotenv = require("dotenv").config();
//Manejo de cors para entorno local 
const cors = require('cors');      

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


//Middlewares


//Routes
app.use('/api/acknowledgment', acknowledgmentRouter);


const server = app.listen(process.env.DB_PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.DB_PORT}` );
});
console.log(db);
db();


module.exports = {app, server}