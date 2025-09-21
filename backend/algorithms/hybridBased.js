const { recommendByArtist } = require("./artistBased");
const { recommendByTags } = require("./tagBased");
const { recommendByTemporal } = require("./temporalBased");
const { recommendByLength } = require("./lengthBased");
const { extractTrackFeatures } = require("../utils/trackFeatures");

/**
 * Helper function to recommend tracks using hybrid approach combining multiple algorithms
 * @param   {Array} candidateTracks - Pool of tracks to recommend from.
 * @param   {Array} playlistTracks - User's playlist tracks.
 * @param   {number} timestamp - Random seed for deterministic results.
 * @returns {Object|null} Recommended track with metadata.
 */
function recommendByHybrid(candidateTracks, playlistTracks, timestamp) {
  // validation: candidateTracks and playlistTracks must be non-empty arrays
  if (
    !candidateTracks ||
    !Array.isArray(candidateTracks) ||
    candidateTracks.length === 0
  ) {
    console.warn("Hybrid: Invalid candidateTracks provided:", candidateTracks);
    return null;
  }

  if (
    !playlistTracks ||
    !Array.isArray(playlistTracks) ||
    playlistTracks.length === 0
  ) {
    console.warn("Hybrid: Invalid playlistTracks provided:", playlistTracks);
    return null;
  }

  // analyse playlist characteristics to determine algorithm weights
  const playlistProfile = analysePlaylistCharacteristics(playlistTracks);
  const algorithmWeights = calculateAlgorithmWeights(playlistProfile);

  // get recommendations from each algorithm
  const recommendations = {
    artist: null,
    tags: null,
    temporal: null,
    length: null,
  };

  try {
    if (algorithmWeights.artist > 0) {
      try {
        recommendations.artist = recommendByArtist(
          candidateTracks,
          playlistTracks,
          timestamp
        );
      } catch (error) {
        recommendations.artist = null;
      }
    }
    if (algorithmWeights.tags > 0) {
      try {
        recommendations.tags = recommendByTags(
          candidateTracks,
          playlistTracks,
          timestamp
        );
      } catch (error) {
        recommendations.tags = null;
      }
    }
    if (algorithmWeights.temporal > 0) {
      try {
        recommendations.temporal = recommendByTemporal(
          candidateTracks,
          playlistTracks,
          timestamp
        );
      } catch (error) {
        recommendations.temporal = null;
      }
    }
    if (algorithmWeights.length > 0) {
      try {
        recommendations.length = recommendByLength(
          candidateTracks,
          playlistTracks,
          timestamp
        );
      } catch (error) {
        recommendations.length = null;
      }
    }
  } catch (error) {
    console.warn(`Hybrid: Error in sub-algorithm: ${error.message}`);
  }

  // aggregate scores using weighted fusion
  const hybridScores = calculateHybridScores(
    recommendations,
    algorithmWeights,
    playlistTracks
  );

  if (!hybridScores || hybridScores.length === 0) {
    return selectRandomTrack(candidateTracks, timestamp);
  }

  // sort by hybrid score
  hybridScores.sort((a, b) => b.hybridScore - a.hybridScore);

  // select from top candidates with diversity consideration
  const topCandidates = hybridScores.slice(0, Math.min(8, hybridScores.length));

  const selectedTrack = selectDiverseCandidate(
    topCandidates,
    playlistTracks,
    timestamp
  );
  if (!selectedTrack) {
    return selectRandomTrack(candidateTracks, timestamp);
  }

  try {
    // Track all algorithms that were attempted for fusion (regardless of whether they recommended this specific track)
    const allUsedAlgorithms = Object.keys(algorithmWeights).filter(
      (alg) => algorithmWeights[alg] > 0
    );

    const result = {
      ...selectedTrack,
      similarity_score: selectedTrack.hybridScore.toFixed(3),
      algorithm_details: {
        algorithm_weights: algorithmWeights,
        contributing_algorithms: allUsedAlgorithms, // Show all algorithms used in fusion
        component_scores: selectedTrack.componentScores,
        diversity_bonus: selectedTrack.diversityBonus || 0,
        consensus_bonus: selectedTrack.consensusBonus || 0,
        fusion_score: selectedTrack.hybridScore,
        playlist_characteristics: {
          artist_diversity: playlistProfile.artistDiversity.toFixed(3),
          tag_diversity: playlistProfile.tagDiversity.toFixed(3),
          temporal_spread: playlistProfile.temporalSpread.toFixed(3),
          length_variability: playlistProfile.lengthVariability.toFixed(3),
          playlist_size: playlistProfile.size,
        },
        fusion_methodology: {
          base_weights: {
            artist: 0.25,
            tags: 0.25,
            temporal: 0.25,
            length: 0.25,
          },
          adaptive_adjustments: getWeightAdjustments(playlistProfile),
          consensus_factor:
            (selectedTrack.contributingAlgorithms || []).length / 4.0,
          diversity_factor: selectedTrack.diversityBonus || 0,
        },
        recommendation_context: {
          total_candidates: hybridScores.length,
          top_candidates_pool: topCandidates.length,
          selected_rank: getTrackRank(selectedTrack, hybridScores),
        },
      },
    };

    return result;
  } catch (error) {
    console.error("Hybrid: Error creating result object:", error.message);
    throw error;
  }
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
      size: 0,
    };
  }

  // artist diversity analysis
  const uniqueArtists = new Set(
    playlistTracks.map(
      (track) => track.artist || track.artist_name || "Unknown"
    )
  );
  const artistDiversity = uniqueArtists.size / playlistTracks.length;

  // tag diversity analysis
  const allTags = new Set();
  playlistTracks.forEach((track) => {
    const features = extractTrackFeatures(track);
    if (features && features.allTags && Array.isArray(features.allTags)) {
      features.allTags.forEach((tag) => allTags.add(tag));
    }
  });
  const tagDiversity = allTags.size / Math.max(playlistTracks.length, 1);

  // temporal spread analysis
  const years = playlistTracks
    .map((track) => {
      const features = extractTrackFeatures(track);
      return features.year;
    })
    .filter((year) => year > 0);

  const temporalSpread =
    years.length > 1
      ? (Math.max(...years) - Math.min(...years)) / Math.max(...years)
      : 0;

  // length variability analysis
  const durations = playlistTracks
    .map((track) => extractTrackFeatures(track).duration)
    .filter((duration) => duration > 0);

  const avgDuration =
    durations.length > 0
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length
      : 0;

  const lengthVariability =
    durations.length > 1
      ? Math.sqrt(
          durations.reduce((sum, d) => sum + Math.pow(d - avgDuration, 2), 0) /
            durations.length
        ) / avgDuration
      : 0;

  return {
    artistDiversity,
    tagDiversity,
    temporalSpread,
    lengthVariability,
    size: playlistTracks.length,
    uniqueArtists: uniqueArtists.size,
    uniqueTags: allTags.size,
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

  // ensure minimum weights so all algorithms participate in hybrid fusion
  const minWeight = 0.05; // minimum 5% weight for each algorithm

  return {
    artist: Math.max(minWeight, artistWeight / totalWeight),
    tags: Math.max(minWeight, tagWeight / totalWeight),
    temporal: Math.max(minWeight, temporalWeight / totalWeight),
    length: Math.max(minWeight, lengthWeight / totalWeight),
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
  // ensure inputs are valid
  if (!recommendations || !weights || !playlistTracks) {
    return [];
  }

  const trackScoreMap = new Map();

  // collect scores from each algorithm
  Object.entries(recommendations).forEach(([algorithm, recommendation]) => {
    try {
      if (recommendation && recommendation.similarity_score) {
        const score = parseFloat(recommendation.similarity_score);

        // ensure the recommendation has required properties
        if (!recommendation.title || !recommendation.artist) {
          console.warn(
            `Hybrid: Invalid recommendation from ${algorithm} algorithm - missing title or artist`,
            recommendation
          );
          return;
        }

        const trackKey = `${recommendation.title}-${recommendation.artist}`;

        if (!trackScoreMap.has(trackKey)) {
          trackScoreMap.set(trackKey, {
            track: recommendation,
            scores: {},
            contributingAlgorithms: [],
          });
        }

        const trackData = trackScoreMap.get(trackKey);
        trackData.scores[algorithm] = score;
        trackData.contributingAlgorithms.push(algorithm);
      }
    } catch (error) {
      console.warn(
        `calculateHybridScores: Error processing ${algorithm}:`,
        error.message
      );
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
      const diversityBonus = calculateDiversityBonus(
        trackData.track,
        playlistTracks
      );

      hybridScores.push({
        ...trackData.track,
        hybridScore: hybridScore + consensusBonus + diversityBonus,
        componentScores: trackData.scores,
        contributingAlgorithms: trackData.contributingAlgorithms,
        consensusBonus,
        diversityBonus,
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
  const playlistArtists = new Set(
    playlistTracks.map((t) => t.artist || t.artist_name)
  );
  const artistBonus = !playlistArtists.has(track.artist || track.artist_name)
    ? 0.05
    : 0;

  // tag diversity bonus
  const playlistTags = new Set();
  playlistTracks.forEach((t) => {
    const features = extractTrackFeatures(t);
    if (features && features.allTags && Array.isArray(features.allTags)) {
      features.allTags.forEach((g) => playlistTags.add(g));
    }
  });

  const hasNewTag =
    trackFeatures.allTags && Array.isArray(trackFeatures.allTags)
      ? trackFeatures.allTags.some((tag) => !playlistTags.has(tag))
      : false;
  const tagBonus = hasNewTag ? 0.03 : 0;

  // temporal diversity bonus
  const playlistYears = playlistTracks
    .map((t) => extractTrackFeatures(t).year)
    .filter((year) => year > 0);

  const avgYear =
    playlistYears.length > 0
      ? playlistYears.reduce((sum, year) => sum + year, 0) /
        playlistYears.length
      : 0;

  const yearDiff = Math.abs(trackFeatures.year - avgYear);
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
      finalScore: track.hybridScore + diversityBonus - positionPenalty,
    };
  });

  // sort by final score
  diversityScores.sort((a, b) => b.finalScore - a.finalScore);

  // select from top 3 with randomisation
  const finalCandidates = diversityScores.slice(
    0,
    Math.min(3, diversityScores.length)
  );
  const randomIndex =
    (timestamp + Math.floor(Math.random() * finalCandidates.length)) %
    finalCandidates.length;

  return finalCandidates[randomIndex];
}

/**
 * Helper function for fallback random selection.
 * @param   {Array} tracks - Available tracks.
 * @param   {number} timestamp - Random seed.
 * @returns {Object} Random track.
 */
function selectRandomTrack(tracks, timestamp) {
  const randomIndex =
    (timestamp + Math.floor(Math.random() * tracks.length)) % tracks.length;
  const track = tracks[randomIndex];

  return {
    ...track,
    similarity_score: "0.500",
    explanation: "hybrid discovery (random selection)",
    algorithm_details: {
      hybrid_fusion: {
        selection_method: "random_fallback",
        reason: "insufficient_algorithm_data",
      },
    },
  };
}

/**
 * Helper function to get weight adjustments for display
 * @param   {Object} profile - Playlist characteristics
 * @returns {Object} Weight adjustments
 */
function getWeightAdjustments(profile) {
  return {
    artist_adjustment:
      profile.artistDiversity < 0.3
        ? "+20%"
        : profile.artistDiversity > 0.8
        ? "-10%"
        : "0%",
    tag_adjustment:
      profile.tagDiversity < 0.5
        ? "+15%"
        : profile.tagDiversity > 1.5
        ? "-10%"
        : "0%",
    temporal_adjustment:
      profile.temporalSpread < 0.1
        ? "+10%"
        : profile.temporalSpread > 0.5
        ? "-5%"
        : "0%",
    length_adjustment:
      profile.lengthVariability < 0.2
        ? "+10%"
        : profile.lengthVariability > 0.5
        ? "-5%"
        : "0%",
  };
}

/**
 * Helper function to get track rank in hybrid scores
 * @param   {Object} selectedTrack - Selected track
 * @param   {Array} hybridScores - All scored tracks
 * @returns {number} Rank position
 */
function getTrackRank(selectedTrack, hybridScores) {
  const trackKey = `${selectedTrack.title}-${selectedTrack.artist}`;
  return (
    hybridScores.findIndex(
      (track) => `${track.title}-${track.artist}` === trackKey
    ) + 1
  );
}

module.exports = {
  recommendByHybrid,
  analysePlaylistCharacteristics,
  calculateAlgorithmWeights,
  calculateDiversityBonus,
};
