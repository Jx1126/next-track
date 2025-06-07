const express = require('express');
const router = express.Router();
const { playlists } = require('../utils/playlistStore'); // import the in-memory playlists storage
const { generateTrackRecommendation } = require('../utils/recommendationEngine'); // import the recommendation generation function

/**
 * @route   POST /api/music/recommend/:id
 * @desc    Generate a track recommendation based on the provided playlist ID and user preferences
 * @param   {string} id - Playlist ID
 * @body    preferences - User preferences for track recommendation (optional)
 * @returns {Object} - JSON object containing the recommended track and playlist details
 * @status  200 - Track recommendation generated successfully
 * @status  400 - Bad Request if the playlist ID is invalid or preferences are not provided
 * @status  404 - Not Found if the playlist does not exist or has no tracks
 * @status  500 - Internal Server Error if there is an issue generating the recommendation
 */
router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const preferences = req.body.preferences || {};

    const playlist = playlists.get(id); // retrieve the playlist by id

    // validation: playlist must exist and have at least one track
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    } else if (!playlist.tracks || playlist.tracks.length === 0) {
      return res.status(404).json({ error: 'Playlist has no tracks' });
    };

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
    console.error(`Error in /recommend/:id ${error.message}`);
    return res.status(500).json({ error: 'Failed to generate recommendation', message: error.message });
  }
});

module.exports = router;