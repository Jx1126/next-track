const { extractTrackFeatures } = require('../utils/trackFeatures');
const { comprehensiveJaccardSimilarity } = require('./jaccardSimilarity');

/**
 * Build similarity scores for all candidate artists based on playlist artists
 * @param   {Array} candidateTracks - Tracks to analyse.
 * @param   {Array} playlistTracks - Reference playlist tracks.
 * @returns {Map} Artist similarity scores.
 */
function buildArtistSimilarityMap(candidateTracks, playlistTracks) {
  const similarityMap = new Map();
  
  // extract playlist features
  const playlistFeatures = playlistTracks.map(track => extractTrackFeatures(track));
  const playlistTags = new Set();
  
  playlistFeatures.forEach(features => {
    features.allTags.forEach(tag => playlistTags.add(tag));
  });
  
  // analyse each candidate artist
  candidateTracks.forEach(track => {
    const trackFeatures = extractTrackFeatures(track);
    const artistKey = trackFeatures.artist.toLowerCase().trim();
    
    if (!similarityMap.has(artistKey)) {
      // calculate similarity using comprehensive Jaccard similarity function that handles all playlist tracks
      const trackTagsArr = Array.from(trackFeatures.allTags);
      const allPlaylistTags = playlistTracks.map(t => Array.from(extractTrackFeatures(t).allTags));
      const similarity = comprehensiveJaccardSimilarity(trackTagsArr, ...allPlaylistTags);
      const intersection = trackTagsArr.filter(tag => playlistTags.has(tag));

      // apply artist-based scoring (favor artist diversity over exact matches)
      let artistScore = 0;
      if (intersection.length > 0) {
        // lower weight for exact artist matches to encourage discovery
        const artistTagMatches = intersection.filter(tag => tag.startsWith('artist:')).length;
        const tagMatches = intersection.length - artistTagMatches;
        // prioritise tag similarity over artist similarity for discovery
        artistScore = (artistTagMatches * 0.2 + tagMatches * 0.8) / Math.max(1, intersection.length);
      }
      // use comprehensive similarity score combined with artist discovery logic
      const finalScore = Math.min(similarity.weighted * 0.7 + artistScore * 0.3, 0.9); // cap at 0.9
      similarityMap.set(artistKey, finalScore);
    }
  });
  return similarityMap;
}

module.exports = {
  buildArtistSimilarityMap
};
