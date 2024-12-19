import mongoose from "mongoose";
//const { MONGO } = require("../config/config");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Server Connected with Database");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;