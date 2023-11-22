const express = require('express');
const db = require('./database/config/db');
const recognitionRouter = require('./api/routes/recognitionRouter');
const userRouter = require('./api/routes/userRouter');
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
app.use(express.json());
//app.use(cors());

//Routes
app.use('/api/recognition', recognitionRouter);
app.use('/api/user', userRouter);

const server = app.listen(process.env.DB_PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.DB_PORT}` );
});
console.log(db);
db();


module.exports = {app, server}