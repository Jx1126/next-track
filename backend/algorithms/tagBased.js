const { extractTrackFeatures } = require('../utils/trackFeatures');
const { comprehensiveJaccardSimilarity } = require('./jaccardSimilarity');

/**
 * Helper function to recommend tracks based on tag similarity
 * @param {Array} candidateTracks - Tracks to recommend from.
 * @param {Array} playlistTracks - User's playlist tracks.
 * @returns {Object|null} - Recommended track with metadata.
 */
function recommendByTags(candidateTracks, playlistTracks) {
  try {
    // validate inputs
    if (!candidateTracks || candidateTracks.length === 0) {
      return null;
    }
    
    if (!playlistTracks || playlistTracks.length === 0) {
      return candidateTracks[Math.floor(Math.random() * candidateTracks.length)];
    }
    
    // extract and aggregate tags from playlist
    const playlistTagProfile = buildTagProfile(playlistTracks);
    
    if (!playlistTagProfile || playlistTagProfile.allTags.length === 0) {
      return candidateTracks[Math.floor(Math.random() * candidateTracks.length)];
    }
    
    // score candidates based on tag similarity
    const scoredTracks = candidateTracks.map(track => {
      try {
        const trackFeatures = extractTrackFeatures(track);
        const trackTags = (trackFeatures && trackFeatures.allTags) ? trackFeatures.allTags : [];
        
        if (trackTags.length === 0) {
          return {
            track,
            score: 0,
            matchedTags: [],
            details: { reason: 'No tags available' }
          };
        }
        
        // calculate tag similarity using comprehensive Jaccard similarity function
        // this uses all playlist tracks instead of just aggregated tags
        const allPlaylistTags = playlistTracks.map(track => {
          const features = extractTrackFeatures(track);
          return features.allTags || [];
        });
        
        const similarity = comprehensiveJaccardSimilarity(trackTags, ...allPlaylistTags);
        
        const tagScore = (
          0.4 * similarity.averageSimilarity +     // average similarity across all playlist tracks
          0.3 * similarity.aggregatedSimilarity +  // similarity to overall playlist profile  
          0.2 * similarity.weightedSimilarity +    // weighted similarity with partial matches
          0.1 * similarity.maxSimilarity           // best match
        );
        
        return {
          track,
          score: tagScore,
          matchedTags: similarity.matchedTags,
          details: {
            averageSimilarity: similarity.averageSimilarity,
            aggregatedSimilarity: similarity.aggregatedSimilarity,
            weightedSimilarity: similarity.weightedSimilarity,
            maxSimilarity: similarity.maxSimilarity,
            exactMatches: similarity.exactMatches,
            partialMatches: similarity.partialMatches,
            trackTags: trackTags.slice(0, 5)
          }
        };
      } catch (error) {
        console.error(`Tag-based: Error scoring track ${track.title || 'unknown'}:`, error.message);
        return {
          track,
          score: 0,
          matchedTags: [],
          details: { error: error.message }
        };
      }
    });
    
    // filter out tracks with no score and sort
    const validTracks = scoredTracks.filter(item => item.score > 0);
    
    if (validTracks.length === 0) {
      return candidateTracks[Math.floor(Math.random() * candidateTracks.length)];
    }
    
    // sort by score (descending)
    validTracks.sort((a, b) => b.score - a.score);
    
    // return the best match
    const selectedTrack = validTracks[0].track;
    
    return selectedTrack;
    
  } catch (error) {
    console.error('Tag-based: Algorithm failed with error:', error);
    
    // fallback to random selection
    if (candidateTracks && candidateTracks.length > 0) {
      return candidateTracks[Math.floor(Math.random() * candidateTracks.length)];
    }
    return null;
  }
}

/**
 * Extract and aggregate tags from playlist tracks
 * @param   {Array} tracks - Playlist tracks
 * @returns {Object} Tag profile with frequency analysis
 */
function buildTagProfile(tracks) {
  try {
    const tagFrequency = {};
    const allTags = [];
    
    tracks.forEach(track => {
      try {
        const features = extractTrackFeatures(track);
        if (features && features.allTags && Array.isArray(features.allTags)) {
          features.allTags.forEach(tag => {
            if (tag && typeof tag === 'string') {
              allTags.push(tag);
              tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
            }
          });
        }
      } catch (error) {
        console.warn(`Tag-based: Error extracting tags from track ${track.title || 'unknown'}:`, error.message);
      }
    });
    
    // get unique tags and sort by frequency
    const tagsSet = [...new Set(allTags)];
    const sortedTagsSet = tagsSet.sort((a, b) => tagFrequency[b] - tagFrequency[a]);
    
    return {
      allTags: tagsSet,
      sortedTagsSet: sortedTagsSet,
      tagFrequency: tagFrequency,
      totalTags: allTags.length
    };
  } catch (error) {
    console.error('Tag-based: Error building tag profile:', error);
    return {
      allTags: [],
      sortedTagsSet: [],
      tagFrequency: {},
      totalTags: 0
    };
  }
}

module.exports = {
  recommendByTags
};
