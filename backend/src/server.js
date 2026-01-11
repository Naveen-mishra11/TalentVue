import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';

const app = express();

app.use(express.json());

const __dirname = path.resolve();


app.get('/health', (req, res) => {
  res.status(200).send({msg:'Success from backend'});
});

app.get('/books', (req, res) => {
  res.status(200).send({msg:'Books endpoint'});
});

// make our app ready for deployment
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));   
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});