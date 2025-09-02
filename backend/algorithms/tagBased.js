const { extractTrackFeatures } = require('../utils/trackFeatures');

/**
 * Extract and aggregate tags from playlist tracks
 * @param {Array} tracks - Playlist tracks
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
        console.warn(`🏷️ Tag-based: Error extracting tags from track ${track.title || 'unknown'}:`, error.message);
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
    console.error('🏷️ Tag-based: Error building tag profile:', error);
    return {
      allTags: [],
      sortedTagsSet: [],
      tagFrequency: {},
      totalTags: 0
    };
  }
}

module.exports = {
  buildTagProfile
};
