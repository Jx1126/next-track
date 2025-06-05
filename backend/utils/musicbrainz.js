const axios = require('axios');

// MusicBrainz API base configs
const musicbrainz_url = 'https://musicbrainz.org/ws/2/';
const user_agent = 'NextTrack (https://github.com/Jx1126/next-track)' // required by MusicBrainz for proper request identification

/**
 * Helper function to create a request to MusicBrainz API
 * 
 * @param {string} endpoint   - MusicBrainz API
 * @param {object} query      - Query parameters for the API request
 * @returns {Promise<object>} - Response data from MusicBrainz API
 */
async function createMusicBrainzRequest(endpoint, query = {}) {
  try {
    const response = await axios.get(`${musicbrainz_url}${endpoint}`, {
      params: {
        fmt: 'json',
        ...query,
      },
      headers: {
        'User-Agent': user_agent, // required by MusicBrainz API guidelines
      },
      timeout: 10000 // timeout to prevent long requests
    });
    return response.data;
  } catch (error) {
    console.error(`MusicBrainz API error: ${error.message}`);
    throw new Error(`MusicBrainz API request failed: ${error.message}`);
  };
}

module.exports = {
  createMusicBrainzRequest
};