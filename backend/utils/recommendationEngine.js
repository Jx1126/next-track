const { generateYoutubeLink } = require('./youtubeLinkGenerator');

/**
 * Helper function to generate a track recommendation based on available tracks and user preferences.
 * 
 * @param {Array} tracks       - Array of track objects to choose from for recommendation.
 * @param {Object} preferences - User preferences for track recommendation.
 * @return {Promise<Object>}   - A promise that resolves to a recommended track object with the YouTube link.
 */
async function generateTrackRecommendation(tracks, preferences) {
  // validation: must have at least one track
  if (!tracks.length === 0) {
    throw new  Error('No tracks available for recommendation');
  }

  // generate randomly recommended track
  const recommended_track = await recommendRandomTrack(tracks);

  // validation: recommended track must have title and artist
  if (!recommended_track) {
    return null; // no suitable track found for recommendation
  } else if (!recommended_track.title || !recommended_track.artist) {
    throw new Error('Recommended track must have a title and artist');
  }

  // generate YouTube link for the recommended track
  const youtube_link = await generateYoutubeLink(recommended_track.title, recommended_track.artist);

  return {
    ...recommended_track,
    youtube_link,
    recommended_at: new Date().toISOString(),
  };
}

/**
 * Helper function to recommend a random track from the provided tracks.
 * 
 * @param {Array} tracks - Array of track objects to choose from.
 * @return {Object}      - A randomly selected track object.
 */
function recommendRandomTrack(tracks) {
  const randomIndex = Math.floor(Math.random() * tracks.length);
  return tracks[randomIndex];
}

module.exports = { generateTrackRecommendation };