const express = require('express');
const db = require('./database/config/db');
const recognitionRouter = require('./api/routes/recognitionRouter');
const userRouter = require('./api/routes/userRouter');
const supportRequestRouter = require('./api/routes/supportRequestRouter');
const valuesBehaviorsRouter = require('./api/routes/valuesBehaviorsRouter');
const teamRouter = require('./api/routes/teamRouter');
const communityRouter = require('./api/routes/CommunityRouter');
const dotenv = require("dotenv").config();
const loginRouter = require("./api/routes/microsoft");
const passport = require("passport");
require("./api/middlewares/microsoft");
const app = express();

app.use(passport.initialize());

app.use("/auth", loginRouter);


//Manejo de cors para entorno local 
const cors = require('cors');      

app.get('/:user', (req, res) => {
  const user  = req.params.user;
  if (user.endsWith("@igglobal.com")) {
    res.send('Hola ' + user + ' eres empleado de infogain');
} else {
  res.send('Hola ' + user + ' eres externo a infogain');
}
  
});

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


//Middlewares
app.use(express.json());

//Routes SupportRequest
app.use('/api/recognition', recognitionRouter);
app.use('/api/user', userRouter);
app.use('/api/supportRequest', supportRequestRouter);
app.use('/api/ValuesBehaviors', valuesBehaviorsRouter);
app.use('/api/teams', teamRouter);
app.use('/api/Communities', communityRouter);

const server = app.listen(process.env.DB_PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.DB_PORT}` );
});
console.log(db);
db();


module.exports = {app, server}