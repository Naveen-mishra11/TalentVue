import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';

const app = express();


const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use('/api/inngest', serve({ client: inngest, functions}));

app.get('/health', (req, res) => {
  res.status(200).send({msg:'Success from backend'});
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