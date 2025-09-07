const { extractTrackFeatures } = require('../utils/trackFeatures');
const { comprehensiveJaccardSimilarity } = require('./jaccardSimilarity');

/**
 * Helper function to recommend tracks based on tag similarity
 * @param {Array} candidateTracks - Tracks to recommend from.
 * @param {Array} playlistTracks - User's playlist tracks.
 * @param {number} timestamp - Random seed for deterministic results.
 * @returns {Object|null} - Recommended track with metadata.
 */
function recommendByTags(candidateTracks, playlistTracks, timestamp = Date.now()) {
  try {
    // validate inputs
    if (!candidateTracks || candidateTracks.length === 0) {
      return null;
    }
    
    if (!playlistTracks || playlistTracks.length === 0) {
      const randomIndex = (timestamp + Math.floor(Math.random() * candidateTracks.length)) % candidateTracks.length;
      return candidateTracks[randomIndex];
    }
    
    // extract and aggregate tags from playlist
    const playlistTagProfile = buildTagProfile(playlistTracks);
    
    if (!playlistTagProfile || playlistTagProfile.allTags.length === 0) {
      const randomIndex = (timestamp + Math.floor(Math.random() * candidateTracks.length)) % candidateTracks.length;
      return candidateTracks[randomIndex];
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
      const randomIndex = (timestamp + Math.floor(Math.random() * candidateTracks.length)) % candidateTracks.length;
      return candidateTracks[randomIndex];
    }
    
    // sort by score (descending)
    validTracks.sort((a, b) => b.score - a.score);
    
    // return the best match
    const selectedItem = validTracks[0];
    const selectedTrack = selectedItem.track;
    
    return {
      ...selectedTrack,
      similarity_score: selectedItem.score.toFixed(3),
      explanation: `Tag-based match with ${selectedItem.matchedTags.length} shared characteristics`,
      algorithm_details: {
        matched_tags: selectedItem.matchedTags.slice(0, 5), // top 5 matched tags
        exact_matches: selectedItem.details.exactMatches || 0,
        partial_matches: selectedItem.details.partialMatches || 0,
        average_similarity: selectedItem.details.averageSimilarity || 0,
        weighted_similarity: selectedItem.details.weightedSimilarity || 0,
        track_tags_count: selectedItem.details.trackTags ? selectedItem.details.trackTags.length : 0,
        aggregated_similarity: selectedItem.details.aggregatedSimilarity || 0,
        max_similarity: selectedItem.details.maxSimilarity || 0,
        all_matched_tags: selectedItem.matchedTags, // all matched tags
        playlist_tag_profile: {
          total_unique_tags: playlistTagProfile.allTags.length,
          total_tags: playlistTagProfile.totalTags,
          most_frequent_tags: playlistTagProfile.sortedTagsSet.slice(0, 3)
        },
        similarity_components: {
          jaccard_base: (selectedItem.details.averageSimilarity * 0.4).toFixed(3),
          aggregated_weight: (selectedItem.details.aggregatedSimilarity * 0.3).toFixed(3),
          weighted_component: (selectedItem.details.weightedSimilarity * 0.2).toFixed(3),
          max_match_bonus: (selectedItem.details.maxSimilarity * 0.1).toFixed(3)
        },
        recommendation_context: {
          total_candidates: validTracks.length,
          rank_position: 1,
          score_range: {
            highest: validTracks[0].score.toFixed(3),
            lowest: validTracks[validTracks.length - 1].score.toFixed(3)
          }
        }
      }
    };
    
  } catch (error) {
    console.error('Tag-based: Algorithm failed with error:', error);
    
    // fallback to random selection
    if (candidateTracks && candidateTracks.length > 0) {
      const randomIndex = (timestamp + Math.floor(Math.random() * candidateTracks.length)) % candidateTracks.length;
      return candidateTracks[randomIndex];
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
    // validation: tracks must be a non-empty array
    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      return { tagFrequency: {}, allTags: [], totalTracks: 0 };
    }
    
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
