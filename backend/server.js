const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const musicbrainz_route = require('./routes/musicbrainz');

app.use('/api/music', musicbrainz_route);

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});