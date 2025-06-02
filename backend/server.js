import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NextTrack API is running!');
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});