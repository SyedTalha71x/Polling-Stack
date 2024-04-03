import express from "express";
import mongoose from "mongoose";
import postroutes from './Routes/userroutes.js'
import pollroutes from './Routes/pollroutes.js'
import cors from 'cors';
import logger from 'morgan';

const app = express();
app.use(express.json());
app.use(cors("*"));
app.use(logger("dev"));

const PORT = 3001;
const MONGO_URI = 'mongodb://127.0.0.1:27017/votingsystem';
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Success');
    }
    catch (error) {
        console.log('Failed');
    }
}
connectDB();
app.use('/api/user', postroutes)
app.use('/api/polls', pollroutes)
app.listen(PORT, () => {
    console.log(`Server is now running at http://localhost:${PORT}`)
})


