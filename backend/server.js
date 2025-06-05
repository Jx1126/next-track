const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const tracks_route = require('./routes/tracks');
const playlists_route = require('./routes/playlists');

app.use('/api/music', tracks_route);
app.use('/api/music/playlist', playlists_route);

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});