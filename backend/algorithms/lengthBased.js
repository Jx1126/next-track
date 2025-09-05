const { extractTrackFeatures, extractDuration } = require('../utils/trackFeatures');
const { comprehensiveCosineSimilarity } = require('./cosineSimilarity');

/**
 * Helper function to recommend tracks based on length/duration similarity
 * @param   {Array} candidateTracks - Pool of tracks to recommend from.
 * @param   {Array} playlistTracks - User's playlist tracks.
 * @param   {number} timestamp - Random seed for deterministic results.
 * @returns {Object|null} Recommended track with metadata.
 */
function recommendByLength(candidateTracks, playlistTracks, timestamp) {
  // extract duration profile from playlist
  const playlistDurationProfile = buildDurationProfile(playlistTracks);
  
  if (!playlistDurationProfile.hasValidDurations) {
    return selectRandomTrack(candidateTracks, timestamp);
  }
  
  // extract features from playlist tracks for comprehensive similarity
  const playlistVectors = playlistTracks.map(track => {
    const features = extractTrackFeatures(track);
    return [
      features.durationMs / 1000000, // normalise duration
      features.yearNormalized,
      features.artistTags.length,
      features.albumTags.length,
      features.decadeTags.length
    ];
  }).filter(vector => vector.every(val => !isNaN(val)));
  
  // score candidates based on duration similarity
  const scoredTracks = candidateTracks.map(track => {
    const trackDuration = extractDuration(track);
    const trackFeatures = extractTrackFeatures(track);
    
    // calculate duration similarity
    const durationScore = calculateDurationSimilarity(
      trackDuration,
      playlistDurationProfile
    );
    
    // duration cluster bonus
    const clusterBonus = calculateClusterBonus(trackDuration, playlistDurationProfile.clusters);
    
    // statistical distribution score
    const distributionScore = calculateDistributionSimilarity(
      trackDuration,
      playlistDurationProfile
    );
    
    // comprehensive similarity
    let comprehensiveScore = 0;
    if (playlistVectors.length > 0) {
      const candidateVector = [
        trackFeatures.durationMs / 1000000, // normalise duration
        trackFeatures.yearNormalized,
        trackFeatures.artistTags.length,
        trackFeatures.albumTags.length,
        trackFeatures.decadeTags.length
      ];
      // only compute if no NaN values
      if (candidateVector.every(val => !isNaN(val))) {
        const similarity = comprehensiveCosineSimilarity(candidateVector, playlistVectors);
        comprehensiveScore = similarity.combinedScore;
      }
    }
    
    // combined length score with comprehensive similarity
    const totalScore = (
      0.4 * durationScore +
      0.25 * clusterBonus +
      0.15 * distributionScore +
      0.2 * comprehensiveScore
    );
    
    // add random factor
    const randomFactor = ((timestamp + track.title.length) % 100) / 1000;
    
    return {
      ...track,
      lengthScore: totalScore + randomFactor,
      trackDuration,
      explanation: formatLengthExplanation(trackDuration, playlistDurationProfile)
    };
  });
  
  // filter tracks with valid durations and length
  const validTracks = scoredTracks.filter(track => 
    track.trackDuration > 0 && track.lengthScore > 0.1
  );
  
  if (validTracks.length === 0) {
    return selectRandomTrack(candidateTracks, timestamp);
  }
  
  // sort by length score
  validTracks.sort((a, b) => b.lengthScore - a.lengthScore);
  
  // select from top candidates
  const topCandidates = validTracks.slice(0, Math.min(6, validTracks.length));
  const randomIndex = (timestamp + Math.floor(Math.random() * topCandidates.length)) % topCandidates.length;
  const selectedTrack = topCandidates[randomIndex];
  
  return {
    ...selectedTrack,
    similarity_score: selectedTrack.lengthScore.toFixed(3),
    algorithm_details: {
      score_breakdown: {
        track_duration: formatDuration(selectedTrack.trackDuration),
        playlist_avg_duration: formatDuration(playlistDurationProfile.avgDuration),
        duration_difference: formatDuration(Math.abs(selectedTrack.trackDuration - playlistDurationProfile.avgDuration)),
        length_category: categoriseDuration(selectedTrack.trackDuration)
      }
    }
  };
}

/**
 * Help function to build duration profile from playlist tracks
 * @param {Array} tracks - Playlist tracks.
 * @returns {Object} Duration profile with statistics.
 */
function buildDurationProfile(tracks) {
  const durations = tracks
    .map(track => extractDuration(track))
    .filter(duration => duration > 0);
  
  if (durations.length === 0) {
    return { hasValidDurations: false };
  }
  
  // calculate basic statistics
  const avgDuration = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  const variance = durations.reduce((sum, duration) => sum + Math.pow(duration - avgDuration, 2), 0) / durations.length;
  const stdDuration = Math.sqrt(variance);
  
  // build duration clusters (short, medium, long)
  const clusters = buildDurationClusters(durations);

  // calculate duration distribution percentiles
  const sortedDurations = [...durations].sort((a, b) => a - b);
  const percentiles = {
    p25: sortedDurations[Math.floor(sortedDurations.length * 0.25)],
    p50: sortedDurations[Math.floor(sortedDurations.length * 0.50)],
    p75: sortedDurations[Math.floor(sortedDurations.length * 0.75)]
  };
  
  return {
    hasValidDurations: true,
    durations,
    avgDuration,
    stdDuration,
    minDuration: Math.min(...durations),
    maxDuration: Math.max(...durations),
    clusters,
    percentiles
  };
}

/**
 * Helper function to build duration clusters
 * @param   {Array} durations - Array of track durations.
 * @returns {Object} Duration clusters.
 */
function buildDurationClusters(durations) {
  const sortedDurations = [...durations].sort((a, b) => a - b); // sort durations
  const third = Math.floor(sortedDurations.length / 3); // divide into three equal parts
  
  return {
    // short duration cluster
    short: {
      count: third,
      avgDuration: sortedDurations.slice(0, third).reduce((sum, d) => sum + d, 0) / third,
      maxDuration: sortedDurations[third - 1] || 0
    },
    // medium duration cluster
    medium: {
      count: third,
      avgDuration: sortedDurations.slice(third, 2 * third).reduce((sum, d) => sum + d, 0) / third,
      maxDuration: sortedDurations[2 * third - 1] || 0
    },
    // long duration cluster
    long: {
      count: sortedDurations.length - 2 * third,
      avgDuration: sortedDurations.slice(2 * third).reduce((sum, d) => sum + d, 0) / (sortedDurations.length - 2 * third),
      maxDuration: sortedDurations[sortedDurations.length - 1] || 0
    }
  };
}

/**
 * Helper functions to calculate duration similarity using Gaussian distribution
 * @param   {number} trackDuration - Candidate track duration in milliseconds.
 * @param   {Object} profile - Playlist duration profile.
 * @returns {number} Duration similarity score.
 */
function calculateDurationSimilarity(trackDuration, profile) {
  if (trackDuration === 0) return 0;
  
  const durationDifference = Math.abs(trackDuration - profile.avgDuration); // difference from average
  const sigma = Math.max(profile.stdDuration, 30000); // minimum spread of 30 seconds
  
  // gaussian similarity with duration difference
  const gaussianSimilarity = Math.exp(-Math.pow(durationDifference, 2) / (2 * Math.pow(sigma, 2)));
  
  return gaussianSimilarity;
}

/**
 * Helper function to calculate cluster bonus for tracks in the same duration category
 * @param   {number} trackDuration - Candidate track duration.
 * @param   {Object} clusters - Duration clusters.
 * @returns {number} Cluster bonus score.
 */
function calculateClusterBonus(trackDuration, clusters) {
  if (trackDuration === 0) return 0;
  
  let clusterMatch = 'none';
  let clusterScore = 0;
  
  // determine which cluster the track belongs to
  if (trackDuration <= clusters.short.maxDuration) {
    clusterMatch = 'short';
    clusterScore = clusters.short.count / (clusters.short.count + clusters.medium.count + clusters.long.count);
  } else if (trackDuration <= clusters.medium.maxDuration) {
    clusterMatch = 'medium';
    clusterScore = clusters.medium.count / (clusters.short.count + clusters.medium.count + clusters.long.count);
  } else {
    clusterMatch = 'long';
    clusterScore = clusters.long.count / (clusters.short.count + clusters.medium.count + clusters.long.count);
  }
  
  return clusterScore;
}

/**
 * Helper function to calculate statistical distribution similarity
 * @param   {number} trackDuration - Candidate track duration.
 * @param   {Object} profile - Duration profile.
 * @returns {number} Distribution similarity score.
 */
function calculateDistributionSimilarity(trackDuration, profile) {
  if (trackDuration === 0) return 0;
  
  // check position within distribution
  if (trackDuration >= profile.percentiles.p25 && trackDuration <= profile.percentiles.p75) {
    return 1.0; // within interquartile range
  } else if (trackDuration >= profile.minDuration && trackDuration <= profile.maxDuration) {
    return 0.6; // within overall range
  }
  
  // calculate distance from nearest boundary
  const distanceFromRange = Math.min(
    Math.abs(trackDuration - profile.minDuration),
    Math.abs(trackDuration - profile.maxDuration)
  );
  
  // decay similarity based on distance
  const maxDistance = profile.avgDuration; // use average as reference distance
  return Math.exp(-distanceFromRange / maxDistance) * 0.3;
}

/**
 * Helper function to categorise duration into groups
 * @param {number} duration - Duration in milliseconds.
 * @returns {string} Duration category.
 */
function categoriseDuration(duration) {
  const minutes = duration / (1000 * 60);
  
  if (minutes < 2) return 'very_short';
  if (minutes < 3.5) return 'short';
  if (minutes < 5) return 'medium';
  if (minutes < 7) return 'long';
  return 'very_long';
}

/**
 * Helper function to format duration for display
 * @param   {number} duration - Duration in milliseconds.
 * @returns {string} Formatted duration string.
 */
function formatDuration(duration) {
  if (duration === 0) return '0:00';
  
  const minutes = Math.floor(duration / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Helper function to format explanation for length recommendation
 * @param   {number} trackDuration - Track duration.
 * @param   {Object} profile - Duration profile.
 * @returns {string} Human-readable explanation.
 */
function formatLengthExplanation(trackDuration, profile) {
  if (trackDuration === 0) return 'Duration exploration (unknown length)';
  
  const durationDiff = Math.abs(trackDuration - profile.avgDuration);
  const tolerance = profile.stdDuration || 30000; // 30 seconds tolerance
  
  if (durationDiff <= tolerance) {
    return `Similar length (${formatDuration(trackDuration)})`;
  } else if (durationDiff <= 2 * tolerance) {
    return `Comparable length (${formatDuration(trackDuration)})`;
  } else {
    return `Duration variety (${formatDuration(trackDuration)})`;
  }
}

/**
 * Helper function to fallback to random selection
 * @param   {Array} tracks - Available tracks.
 * @param   {number} timestamp - Random seed.
 * @returns {Object} Random track.
 */
function selectRandomTrack(tracks, timestamp) {
  const randomIndex = (timestamp + Math.floor(Math.random() * tracks.length)) % tracks.length; // deterministic random index
  const track = tracks[randomIndex]; // select random track
  
  return {
    ...track,
    similarity_score: '0.500',
    explanation: 'Duration exploration (random selection)',
    algorithm_details: {
      score_breakdown: {
        selection_method: 'random_fallback',
        reason: 'insufficient_duration_data'
      }
    }
  };
}

module.exports = {
  recommendByLength,
  buildDurationProfile,
  calculateDurationSimilarity,
  categoriseDuration,
  formatDuration
};
