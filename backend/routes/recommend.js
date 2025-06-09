const express = require('express');
const router = express.Router();
const { generateTrackRecommendation } = require('../utils/recommendationEngine'); // import the recommendation generation function
const { generatePlaylistToken, verifyPlaylistToken } = require('../utils/playlistToken');

/**
 * @route   POST /api/music/recommend/
 * @desc    Generate a track recommendation based on the provided playlist token and user preferences
 * @body    playlist_token (required) - Token of the playlist
 * @body    preferences (optional) - User preferences
 * @returns {Object} - JSON object containing the recommended track and playlist details
 */
router.post('/', async (req, res) => {
  try {
    const { playlist_token, preferences = {} } = req.body;

    // validation: playlist token is required
    if (!playlist_token) {
      return res.status(400).json({
        error: 'Playlist token is required',
        message: 'Please provide a valid playlist token to generate a recommendation.',
      });
    }

    const playlist = verifyPlaylistToken(playlist_token);

    // validation: playlist must exist and have at least one track
    if (!playlist) {
      return res.status(404).json({
        error: 'Playlist not found',
        message: 'The provided playlist token is invalid or the playlist does not exist.',
      });
    } else if (!playlist.tracks || playlist.tracks.length === 0) {
      return res.status(400).json({
        error: 'No tracks in playlist',
        message: 'The playlist must contain at least one track to generate a recommendation.',
      });
    }

    // generate a track recommendation based on the playlist tracks and user preferences
    const recommended_track = await generateTrackRecommendation(playlist.tracks, preferences);

    // validation: recommended track must exist
    if (!recommended_track) {
      return res.status(404).json({ error: 'No suitable track found for recommendation' });
    }

    res.json({
      message: 'Track recommendation generated successfully',
      playlist: {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        added_tracks_count: playlist.tracks.length,
        last_updated: playlist.last_updated,
      },
      preferences,
      recommended_track,
      recommended_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error in /recommend ${error.message}`);
    return res.status(500).json({ error: 'Failed to generate recommendation', message: error.message });
  }
});

module.exports = router;