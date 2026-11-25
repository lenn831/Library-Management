import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/books', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Library backend running at http://localhost:3000');
});