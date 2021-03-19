import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import userRouter from './routers/userRouter.js';
import meetingRouter from './routers/meetingRouter.js';

dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/firstrest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/meetings', meetingRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(500).send({ message: 'Well Eoin, it works!'})
});

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port},`);
});