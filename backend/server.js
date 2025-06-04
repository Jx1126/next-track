const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const recommendation_route = require('./routes/recommendations');
const musicbrainz_route = require('./routes/musicbrainz');

app.use('/api/recommendations', recommendation_route);
app.use('/api/musicbrainz', musicbrainz_route);

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});