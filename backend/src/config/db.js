const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@clusterreactgram.50lxm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterReactGram`
    );

    console.log("Connected");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();
