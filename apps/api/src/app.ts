import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connect';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('HEY!!!!');
});

const start = async () => {
  try {
    const dbURL = process.env.MONGO_URI;
    if (!dbURL) {
      console.log('No database url present in env file.');
      return;
    }
    await connectDB(dbURL);
    console.log('Database connection successful.');
    app.listen(port, () => console.log(`Server is listening on port 5000...`));
  } catch (error) {
    console.log(error);
  }
};

start();
