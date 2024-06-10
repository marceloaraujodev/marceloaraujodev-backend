import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Visitor from './model/visitor.js';

dotenv.config()
const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin:  ['http://localhost:5173', 'https://marceloaraujodev.onrender.com'],
  // origin:  'https://mybank-client.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust this based on your needs
  credentials: true
}));
app.use(express.json());

// connect to db
const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE);
  console.log('connected to database successfully')
}
connectDB();

app.post('/visitors', async (req, res) => {
  console.log(req.body)

  const {userJob} = req.body;

  
  const newUser = {
    recruiter: userJob.includes('recruiter'),
    developer: userJob.includes('developer'),
    other: userJob.includes('other')
  }

  console.log(newUser)
  
  console.log(userJob) // []
  
  const user = await Visitor.create(newUser)

  res.status(200).json({success: true, user})
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))