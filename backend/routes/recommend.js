const express = require('express');
const router = express.Router();
const { generateTrackRecommendation } = require('../utils/recommendationEngine'); // import the recommendation generation function

/**
 * @route   POST /api/music/recommend/
 * @desc    Generate a track recommendation based on the provided playlist and user preferences
 * @body    playlist (required) - Current playlist object
 * @body    preferences (optional) - User preferences
 * @returns {Object} - JSON object containing the recommended track and playlist details
 */
router.post('/', async (req, res) => {
  try {
    const { playlist, preferences = {} } = req.body;

    // validation: playlist is required
    if (!playlist) {
      return res.status(400).json({
        error: 'Playlist token is required',
        message: 'Please provide a valid playlist token to generate a recommendation.',
      });
    } else if (playlist.tracks.length === 0) {
      return res.status(400).json({
        error: 'Playlist is empty',
        message: 'Please add tracks to the playlist before generating a recommendation.',
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
    return res.status(500).json({
      error: 'Failed to generate recommendation',
      message: error.message
    });
  }
});

module.exports = router;