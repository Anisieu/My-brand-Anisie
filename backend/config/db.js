const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

// Replace this with your MONGOURI.


const InitiateMongoServer = async () => {
  try {
    console.log("=======================  process.env.MONGOUR  =====================");
    console.log(process.env.MONGOUR);
    
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
