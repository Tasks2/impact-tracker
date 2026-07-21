import app from './app';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(errorHandler);

//Health check
app.get('/', (req, res)=> {
  res.status(200).json({ 
    message: 'Server is running',
    status: 'ok'
  });
});

//Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});