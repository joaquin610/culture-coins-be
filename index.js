const express = require('express');
const db = require('./database/config/db');
const reconocimientoRouter = require('./api/routes/reconocimientoRouter');
const app = express();
const dotenv = require("dotenv").config();


app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});


//Middlewares


//Routes
app.use('/api/reconocimineto', reconocimientoRouter);


const server = app.listen(process.env.DB_PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.DB_PORT}` );
});
console.log(db);
db();


module.exports = {app, server}