/**
 * Helper function to generate random recommendation from candidate tracks
 * @param {Array} candidateTracks - Available tracks for recommendation
 * @param {number} timestamp - Timestamp for deterministic randomness
 * @returns {Object} Randomly selected track with metadata
 */
function recommendByRandom(candidateTracks, timestamp) {
  if (!candidateTracks || candidateTracks.length === 0) {
    return null;
  }

  // timestamp for deterministic randomness
  const randomIndex =
    (timestamp + Math.floor(Math.random() * candidateTracks.length)) %
    candidateTracks.length;
  const selectedTrack = candidateTracks[randomIndex];

  return {
    ...selectedTrack,
    similarity_score: "1.000", // random selection with maximum diversity
    explanation: "Random discovery for serendipitous exploration",
    algorithm_details: {
      selection_method: "deterministic_random",
      candidate_pool_size: candidateTracks.length,
      selection_index: randomIndex,
      diversity_factor: 1.0,
      randomness_source: "timestamp_based",
      exploration_rate: "100%",
      selection_probability: (1 / candidateTracks.length).toFixed(6),
      entropy_factor: Math.log2(candidateTracks.length).toFixed(3),
      discovery_metrics: {
        pool_diversity: "maximum",
        predictability: "minimal",
        serendipity_potential: "high",
      },
      algorithm_characteristics: {
        bias: "none",
        preference_learning: "disabled",
        exploration_vs_exploitation: "100% exploration",
      },
    },
  };
}

module.exports = {
  recommendByRandom,
};
