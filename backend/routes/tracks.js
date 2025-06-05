const express = require('express');
const router = express.Router();
const axios = require('axios');
const { createMusicBrainzRequest } = require('../utils/musicbrainz'); // import the helper function to create MusicBrainz requests

/**
 * @route   GET /api/music/search
 * @desc    Search for tracks in MusicBrainz database
 * @query   q      (optional) - General search query
 * @query   artist (optional) - Artist name
 * @query   track  (optional) - Track name
 * @query   limit  (optional) - Number of results to return (default: 10, max: 100)
 * @query   offset (optional) - Offset for pagination (default: 0)
 * @returns {object} - JSON object containing search results, total tracks, offset, limit, and query
 * @status  200 - Search results returned successfully
 * @status  400 - Bad Request if no search parameters are provided
 * @status  500 - Internal Server Error if there is an issue with the MusicBrainz API request
 */
router.get('/search', async (req, res) => {
  try {
    const { q, artist, track, limit = 10, offset = 0 } = req.query;

    // validation: must provide at least one search parameter
    if (!q && !artist && !track) {
      return res.status(400).json({
        error: 'Search query required',
        message: 'Provide either "q" for general search, or "artist" and/or "track" for specific search'
      });
    }

    // set up the query based on provided parameters
    // if 'q' is provided, search directly, if not, build a query from 'artist' and 'track'
    let query = '';
    if (q) {
      query = q;
    } else {
      const query_parts = [];
      if (artist) query_parts.push(`artist:${artist}`);
      if (track) query_parts.push(`track:${track}`);
      query = query_parts.join(' AND ');
    }

    // set up parameters for MusicBrainz API request
    const data = await createMusicBrainzRequest('recording', {
      query,
      limit: Math.min(limit, 100), // limit to max 100 results
      offset: parseInt(offset)
    });

    // format the search results
    const search_result_tracks = data.recordings.map((recording) => ({
        id: recording.id,
        title: recording.title,
        artist: recording['artist-credit']?.[0]?.name || 'Unknown Artist',
        artist_id: recording['artist-credit']?.[0]?.artist?.id,
        length: recording.length ? Math.round(recording.length / 1000) : 0, // length in seconds
        releases: recording.releases?.map(release => ({
          id: release.id,
          title: release.title,
          date: release.date,
        })) || [],
        tags: recording.tags?.map(tag => tag.name) || [],
        score: recording.score || 0,
      })) || [];

    // return the formatted response back to the client
    res.json({
      search_result_tracks,
      total_search_result_tracks: data.count || 0,
      offset: parseInt(offset),
      limit: parseInt(limit),
      query: query,
    });
    
  } catch (error) {
    console.error(`Error in /search: ${error.message}`);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

module.exports = router;