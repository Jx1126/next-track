const { extractTrackFeatures } = require('../utils/trackFeatures');
const { comprehensiveJaccardSimilarity } = require('./jaccardSimilarity');

/**
 * Helper function to recommend tracks based on artist similarity
 * @param {Array} candidateTracks - Pool of tracks to recommend from.
 * @param {Array} playlistTracks - User's playlist tracks.
 * @param {number} timestamp - Random seed for deterministic results.
 * @returns {Object|null} Recommended track with metadata.
 */
function recommendByArtist(candidateTracks, playlistTracks, timestamp) {
  
  try {
    // extract playlist artists and features
    const playlistArtists = playlistTracks.map(track => 
      (track.artist || '').toLowerCase().trim()
    ).filter(artist => artist.length > 0);
    
    const uniquePlaylistArtists = [...new Set(playlistArtists)];
    
    if (uniquePlaylistArtists.length === 0) {
      const randomIndex = Math.floor(Math.random() * candidateTracks.length);
      return candidateTracks[randomIndex];
    }
    
    // calculate artist similarity scores
    const artistSimilarityMap = buildArtistSimilarityMap(candidateTracks, playlistTracks);
    
    // score candidates based on artist similarity
    const scoredTracks = candidateTracks.map(track => {
      const trackFeatures = extractTrackFeatures(track);
      const trackArtist = trackFeatures.artist.toLowerCase().trim();
      
      let artistScore = 0;
      let matchType = 'discovery';
      
      // exact artist match (lower score to encourage diversity)
      if (uniquePlaylistArtists.includes(trackArtist)) {
        artistScore = 0.3; // lower score
        matchType = 'same_artist';
      } else {
        // calculate artist similarity based on shared tags
        artistScore = artistSimilarityMap.get(trackArtist) || 0;
        if (artistScore > 0.3) {
          matchType = 'similar_artist';
        } else if (artistScore > 0.1) {
          matchType = 'related_artist';
        }
      }
      
      // add random factor
      const randomFactor = ((timestamp + track.title.length) % 100) / 10000;
      
      return {
        track,
        artistScore: artistScore + randomFactor,
        matchType,
        explanation:
          matchType === 'same_artist' ? `Same artist (${track.artist})` : 
          matchType === 'similar_artist' ? `Similar artist to ${uniquePlaylistArtists[0]}` :
          matchType === 'related_artist' ? `Related to ${uniquePlaylistArtists[0]}` :
          'Artist discovery'
      };
    });
    
    // sort by artist score (most relevant first)
    scoredTracks.sort((a, b) => b.artistScore - a.artistScore);
    
    // select the best candidate
    const selectedItem = scoredTracks[0];
    const selectedTrack = selectedItem.track;
    
    return {
      ...selectedTrack,
      similarity_score: selectedItem.artistScore.toFixed(3),
      explanation: selectedItem.explanation,
      algorithm_details: {
        score_breakdown: {
          artist_similarity: selectedItem.artistScore,
          playlist_artists: uniquePlaylistArtists,
          match_type: selectedItem.matchType
        }
      }
    };
  } catch (error) {
    // fallback to random
    const randomIndex = Math.floor(Math.random() * candidateTracks.length);
    return candidateTracks[randomIndex];
  }
}

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
  recommendByArtist
};
