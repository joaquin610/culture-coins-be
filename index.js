const express = require('express');
const db = require('./database/config/db');
const recognitionRouter = require('./api/routes/recognitionRouter');
const userRouter = require('./api/routes/userRouter');
const supportRequestRouter = require('./api/routes/supportRequestRouter');
const valuesBehaviorsRouter = require('./api/routes/valuesBehaviorsRouter');
const skillRouter = require('./api/routes/skillRouter');
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

//Routes SupportRequest
app.use('/api/recognition', recognitionRouter);
app.use('/api/user', userRouter);
app.use('/api/supportRequest', supportRequestRouter);
app.use('/api/ValuesBehaviors', valuesBehaviorsRouter);
app.use('/api/skills', skillRouter);

const server = app.listen(process.env.DB_PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.DB_PORT}` );
});
console.log(db);
db();


module.exports = {app, server}