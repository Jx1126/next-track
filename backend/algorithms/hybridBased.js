const { recommendByArtist } = require('./artistBased');
const { recommendByTags } = require('./tagBased');
const { recommendByTemporal } = require('./temporalBased');
const { recommendByLength } = require('./lengthBased');
const { extractTrackFeatures } = require('../utils/trackFeatures');

/**
 * Helper function to recommend tracks using hybrid approach combining multiple algorithms
 * @param   {Array} candidateTracks - Pool of tracks to recommend from.
 * @param   {Array} playlistTracks - User's playlist tracks.
 * @param   {number} timestamp - Random seed for deterministic results.
 * @returns {Object|null} Recommended track with metadata.
 */
function recommendByHybrid(candidateTracks, playlistTracks, timestamp) {
  // analyse playlist characteristics to determine algorithm weights
  const playlistProfile = analysePlaylistCharacteristics(playlistTracks);
  const algorithmWeights = calculateAlgorithmWeights(playlistProfile);
  
  // get recommendations from each algorithm
  const recommendations = {
    artist: null,
    tags: null,
    temporal: null,
    length: null
  };
  
  try {
    if (algorithmWeights.artist > 0) {
      recommendations.artist = recommendByArtist(candidateTracks, playlistTracks, timestamp);
    }
    if (algorithmWeights.tags > 0) {
      recommendations.tags = recommendByTags(candidateTracks, playlistTracks, timestamp);
    }
    if (algorithmWeights.temporal > 0) {
      recommendations.temporal = recommendByTemporal(candidateTracks, playlistTracks, timestamp);
    }
    if (algorithmWeights.length > 0) {
      recommendations.length = recommendByLength(candidateTracks, playlistTracks, timestamp);
    }
  } catch (error) {
    console.warn(`🔀 Hybrid: Error in sub-algorithm: ${error.message}`);
  }
  
  // aggregate scores using weighted fusion
  const hybridScores = calculateHybridScores(
    recommendations,
    algorithmWeights,
    playlistTracks
  );
  
  if (hybridScores.length === 0) {
    return selectRandomTrack(candidateTracks, timestamp);
  }
  
  // sort by hybrid score
  hybridScores.sort((a, b) => b.hybridScore - a.hybridScore);
  
  // select from top candidates with diversity consideration
  const topCandidates = hybridScores.slice(0, Math.min(8, hybridScores.length));
  const selectedTrack = selectDiverseCandidate(topCandidates, playlistTracks, timestamp);
  
  return {
    ...selectedTrack,
    similarity_score: selectedTrack.hybridScore.toFixed(3),
    algorithm_details: {
      hybrid_fusion: {
        algorithm_weights: algorithmWeights,
        contributing_algorithms: selectedTrack.contributingAlgorithms,
        component_scores: selectedTrack.componentScores,
        diversity_bonus: selectedTrack.diversityBonus || 0
      }
    }
  };
}

/**
 * Helper function to analyse playlist characteristics to inform algorithm weighting
 * @param   {Array} playlistTracks - Playlist tracks
 * @returns {Object} Playlist characteristic profile
 */
function analysePlaylistCharacteristics(playlistTracks) {
  if (playlistTracks.length === 0) {
    return {
      artistDiversity: 0,
      tagDiversity: 0,
      temporalSpread: 0,
      lengthVariability: 0,
      size: 0
    };
  }
  
  // artist diversity analysis
  const uniqueArtists = new Set(playlistTracks.map(track => track.artist || track.artist_name || 'Unknown'));
  const artistDiversity = uniqueArtists.size / playlistTracks.length;
  
  // tag diversity analysis
  const allTags = new Set();
  playlistTracks.forEach(track => {
    const features = extractTrackFeatures(track);
    features.allTags.forEach(tag => allTags.add(tag));
  });
  const tagDiversity = allTags.size / Math.max(playlistTracks.length, 1);
  
  // temporal spread analysis
  const years = playlistTracks
    .map(track => {
      const features = extractTrackFeatures(track);
      return features.releaseYear;
    })
    .filter(year => year > 0);
  
  const temporalSpread = years.length > 1 
    ? (Math.max(...years) - Math.min(...years)) / Math.max(...years)
    : 0;
  
  // length variability analysis
  const durations = playlistTracks
    .map(track => extractTrackFeatures(track).duration)
    .filter(duration => duration > 0);
  
  const avgDuration = durations.length > 0 
    ? durations.reduce((sum, d) => sum + d, 0) / durations.length
    : 0;
  
  const lengthVariability = durations.length > 1
    ? Math.sqrt(durations.reduce((sum, d) => sum + Math.pow(d - avgDuration, 2), 0) / durations.length) / avgDuration
    : 0;
  
  return {
    artistDiversity,
    tagDiversity,
    temporalSpread,
    lengthVariability,
    size: playlistTracks.length,
    uniqueArtists: uniqueArtists.size,
    uniqueTags: allTags.size
  };
}

/**
 * Helper function to calculate algorithm weights based on playlist characteristics
 * @param   {Object} profile - Playlist characteristic profile.
 * @returns {Object} Algorithm weights.
 */
function calculateAlgorithmWeights(profile) {
  const baseWeight = 0.25; // equal weighting as baseline
  
  // adjust weights based on playlist characteristics
  let artistWeight = baseWeight;
  let tagWeight = baseWeight;
  let temporalWeight = baseWeight;
  let lengthWeight = baseWeight;
  
  // artist-based weight adjustment (low diversity = more weight, high diversity = less weight)
  if (profile.artistDiversity < 0.3) {
    artistWeight += 0.2;
  } else if (profile.artistDiversity > 0.8) {
    // high artist diversity= less emphasis on artist similarity
    artistWeight -= 0.1;
  }
  
  // tag-based weight adjustment (low diversity = more weight, high diversity = less weight)
  if (profile.tagDiversity < 0.5) {
    tagWeight += 0.15;
  } else if (profile.tagDiversity > 1.5) {
    tagWeight -= 0.1;
  }
  
  // temporal weight adjustment (low diversity = more weight, high diversity = less weight)
  if (profile.temporalSpread < 0.1) {
    temporalWeight += 0.1;
  } else if (profile.temporalSpread > 0.5) {
    temporalWeight -= 0.05;
  }
  
  // length weight adjustment (low diversity = more weight, high diversity = less weight)
  if (profile.lengthVariability < 0.2) {
    lengthWeight += 0.1;
  } else if (profile.lengthVariability > 0.5) {
    lengthWeight -= 0.05;
  }
  
  // normalise weights to sum
  const totalWeight = artistWeight + tagWeight + temporalWeight + lengthWeight;
  
  return {
    artist: Math.max(0.05, artistWeight / totalWeight),
    tags: Math.max(0.05, tagWeight / totalWeight),
    temporal: Math.max(0.05, temporalWeight / totalWeight),
    length: Math.max(0.05, lengthWeight / totalWeight)
  };
}

/**
 * helper function to calculate hybrid scores for all candidate tracks
 * @param {Object} recommendations - individual algorithm recommendations
 * @param {Object} weights - algorithm weights
 * @param {Array} playlistTracks - playlist tracks for diversity calculation
 * @returns {Array} tracks with hybrid scores
 */
function calculateHybridScores(recommendations, weights, playlistTracks) {
  const trackScoreMap = new Map();
  
  // collect scores from each algorithm
  Object.entries(recommendations).forEach(([algorithm, recommendation]) => {
    if (recommendation && recommendation.similarity_score) {
      const score = parseFloat(recommendation.similarity_score);
      const trackKey = `${recommendation.title}-${recommendation.artist}`;
      
      if (!trackScoreMap.has(trackKey)) {
        trackScoreMap.set(trackKey, {
          track: recommendation,
          scores: {},
          contributingAlgorithms: []
        });
      }
      
      const trackData = trackScoreMap.get(trackKey);
      trackData.scores[algorithm] = score;
      trackData.contributingAlgorithms.push(algorithm);
    }
  });
  
  // calculate hybrid scores using weighted combination
  const hybridScores = [];
  
  for (const [trackKey, trackData] of trackScoreMap) {
    let hybridScore = 0;
    let totalWeight = 0;
    
    // weighted sum of available algorithm scores
    Object.entries(weights).forEach(([algorithm, weight]) => {
      if (trackData.scores[algorithm] !== undefined) {
        hybridScore += weight * trackData.scores[algorithm];
        totalWeight += weight;
      }
    });
    
    // normalise by total weight of contributing algorithms
    if (totalWeight > 0) {
      hybridScore = hybridScore / totalWeight;
      
      // bonus for multiple algorithm agreement
      const algorithmConsensus = trackData.contributingAlgorithms.length / 4.0;
      const consensusBonus = algorithmConsensus * 0.1;
      
      // diversity bonus
      const diversityBonus = calculateDiversityBonus(trackData.track, playlistTracks);
      
      hybridScores.push({
        ...trackData.track,
        hybridScore: hybridScore + consensusBonus + diversityBonus,
        componentScores: trackData.scores,
        contributingAlgorithms: trackData.contributingAlgorithms,
        consensusBonus,
        diversityBonus
      });
    }
  }
  
  return hybridScores;
}

/**
 * Helper function to calculate diversity bonus for track selection
 * @param   {Object} track - Candidate track.
 * @param   {Array} playlistTracks - Existing playlist tracks.
 * @returns {number} Diversity bonus.
 */
function calculateDiversityBonus(track, playlistTracks) {
  if (playlistTracks.length === 0) return 0;
  
  const trackFeatures = extractTrackFeatures(track);
  
  // artist diversity bonus
  const playlistArtists = new Set(playlistTracks.map(t => t.artist || t.artist_name));
  const artistBonus = !playlistArtists.has(track.artist || track.artist_name) ? 0.05 : 0;
  
  // tag diversity bonus
  const playlistTags = new Set();
  playlistTracks.forEach(t => {
    const features = extractTrackFeatures(t);
    features.tags.forEach(g => playlistTags.add(g));
  });
  
  const hasNewTag = trackFeatures.tags.some(tag => !playlistTags.has(tag));
  const tagBonus = hasNewTag ? 0.03 : 0;
  
  // temporal diversity bonus
  const playlistYears = playlistTracks
    .map(t => extractTrackFeatures(t).releaseYear)
    .filter(year => year > 0);
  
  const avgYear = playlistYears.length > 0 
    ? playlistYears.reduce((sum, year) => sum + year, 0) / playlistYears.length 
    : 0;
  
  const yearDiff = Math.abs(trackFeatures.releaseYear - avgYear);
  const temporalBonus = yearDiff > 10 ? 0.02 : 0;
  
  return Math.min(0.2, artistBonus + tagBonus + temporalBonus);
}

/**
 * Helper function to select diverse candidate from top hybrid scores
 * @param   {Array} topCandidates - Top scoring candidates.
 * @param   {Array} playlistTracks - Existing playlist tracks.
 * @param   {number} timestamp - Random seed.
 * @returns {Object} Selected track with diversity consideration.
 */
function selectDiverseCandidate(topCandidates, playlistTracks, timestamp) {
  if (topCandidates.length === 1) {
    return topCandidates[0];
  }
  
  // apply diversity re-ranking to top candidates
  const diversityScores = topCandidates.map((track, index) => {
    const diversityBonus = calculateDiversityBonus(track, playlistTracks);
    const positionPenalty = index * 0.02; // small penalty for lower ranking
    
    return {
      ...track,
      finalScore: track.hybridScore + diversityBonus - positionPenalty
    };
  });
  
  // sort by final score
  diversityScores.sort((a, b) => b.finalScore - a.finalScore);
  
  // select from top 3 with randomisation
  const finalCandidates = diversityScores.slice(0, Math.min(3, diversityScores.length));
  const randomIndex = (timestamp + Math.floor(Math.random() * finalCandidates.length)) % finalCandidates.length;
  
  return finalCandidates[randomIndex];
}

/**
 * Helper function for fallback random selection.
 * @param   {Array} tracks - Available tracks.
 * @param   {number} timestamp - Random seed.
 * @returns {Object} Random track.
 */
function selectRandomTrack(tracks, timestamp) {
  const randomIndex = (timestamp + Math.floor(Math.random() * tracks.length)) % tracks.length;
  const track = tracks[randomIndex];
  
  return {
    ...track,
    similarity_score: '0.500',
    explanation: 'hybrid discovery (random selection)',
    algorithm_details: {
      hybrid_fusion: {
        selection_method: 'random_fallback',
        reason: 'insufficient_algorithm_data'
      }
    }
  };
}

module.exports = {
  recommendByHybrid,
  analysePlaylistCharacteristics,
  calculateAlgorithmWeights,
  calculateDiversityBonus
};
