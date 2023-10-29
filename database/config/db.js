const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://CultureCoins:cultureCoins*!(1)@culturecoins.3faqi4m.mongodb.net/`;

module.exports = () => {

  const connect = () => {
    try {
        mongoose.connect(
            DB_URI,
            {     
              useNewUrlParser: true,
              useUnifiedTopology: true,
            }
            
          ); 
    } catch (error) {
       console.log("Error al conectarse a la base de datos " + error); 
    }
  };

  
  connect();
};
//mongodb://localhost:27017
