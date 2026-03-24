import express from 'express';
import { connectDB } from './src/config/db.js';
const PORT = process.env.PORT || 3000;


const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});