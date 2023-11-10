import mongoose from "mongoose"; 
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_URL;

if (!url) {
    console.error("MONGO_URL is not defined in the environment variables.");
    process.exit(1); // Exit the process with an error code
  }
  

export const connect = mongoose.connect(url).then(() => {
    console.log('Mongodb Connected Success')
}).catch(err => {
    console.log(`Mongodb Erorrr ${err}`)
})