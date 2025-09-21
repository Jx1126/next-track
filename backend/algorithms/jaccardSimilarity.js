/**
 * Helper function to calculate Jaccard similarity.
 * @param  {Array} setA - First set/array.
 * @param  {Array} setB - Second set/array.
 * @return {number} - Similarity score.
 */
function jaccardSimilarity(setA, setB) {
  const a = new Set(Array.isArray(setA) ? setA : setA);
  const b = new Set(Array.isArray(setB) ? setB : setB);

  const intersection = new Set([...a].filter((x) => b.has(x))); // |A ∩ B|
  const union = new Set([...a, ...b]); // |A ∪ B|

  if (union.size === 0) return 0; // avoid division by 0
  return intersection.size / union.size; // |A ∩ B| / |A ∪ B|
}

/**
 * Helper function to calculate Jaccard similarity between candidate and playlist tags.
 * @param  {Array} candidateSet - Candidate tags.
 * @param  {...Array} playlistSets - Playlist tags.
 * @return {number} - Similarity score.
 */
function playlistJaccardSimilarity(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // aggregate all playlist tags into a set
  const aggregatedPlaylistTags = new Set();
  playlistSets.forEach((playlistSet) => {
    const setArray = Array.isArray(playlistSet)
      ? playlistSet
      : Array.from(playlistSet); // convert to array if not already
    setArray.forEach((tag) => aggregatedPlaylistTags.add(tag)); // add each tag to the aggregated set
  });

  // calculate similarity against aggregated playlist
  return jaccardSimilarity(candidateSet, aggregatedPlaylistTags);
}

/**
 * Helper function to calculate average Jaccard similarity across playlist tracks.
 * @param  {Array} candidateSet - Candidate tags.
 * @param  {...Array} playlistSets - Playlist tags.
 * @return {number} - Average similarity score.
 */
function averageJaccardSimilarity(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // calculate similarity for each playlist
  const similarities = playlistSets.map((playlistSet) =>
    jaccardSimilarity(candidateSet, playlistSet)
  );

  const total = similarities.reduce((sum, sim) => sum + sim, 0); // sum all similarities

  return total / similarities.length; // calculate average similarity
}

/**
 * Helper function to calculate maximum Jaccard similarity across playlist tracks.
 * @param  {Array} candidateSet - Candidate tags.
 * @param  {...Array} playlistSets - Playlist tags.
 * @return {number} - Maximum similarity score.
 */
function maxJaccardSimilarity(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // calculate similarity for each playlist
  const similarities = playlistSets.map((playlistSet) =>
    jaccardSimilarity(candidateSet, playlistSet)
  );

  return Math.max(...similarities); // calculate maximum similarity score
}

/**
 * Helper function to calculate weighted Jaccard similarity with partial matching.
 * @param  {Array<string>} candidateTags - Candidate tags.
 * @param  {...Array<string>} playlistTagSets - Playlist tags.
 * @return {Object} - Weighted similarity metrics.
 */
function weightedJaccardSimilarity(candidateTags, ...playlistTagSets) {
  // validation: playlistTagSets must contain tags
  if (playlistTagSets.length === 0) {
    return {
      similarity: 0,
      exactMatches: 0,
      partialMatches: 0,
      matchedTags: [],
      totalTags: candidateTags.length,
    };
  }

  // normalise candidate tags
  const normalisedCandidateTags = candidateTags.map((tag) =>
    tag.toLowerCase().trim()
  );

  // aggregate all playlist tags
  const allPlaylistTags = new Set();
  playlistTagSets.forEach((tagSet) => {
    tagSet.forEach((tag) => allPlaylistTags.add(tag.toLowerCase().trim()));
  });

  // convert aggregated set to array
  const normalisedPlaylist = Array.from(allPlaylistTags);

  let exactMatches = 0;
  let partialMatches = 0;
  const matchedTags = [];

  for (const tagA of normalisedCandidateTags) {
    // exact match
    if (normalisedPlaylist.includes(tagA)) {
      exactMatches++;
      matchedTags.push(tagA);
    } else {
      // partial match
      for (const tagB of normalisedPlaylist) {
        if (tagA.includes(tagB) || tagB.includes(tagA)) {
          partialMatches += 0.5; // half weight for partial matches
          matchedTags.push(`${tagA}~${tagB}`); // indicate partial match
          break;
        }
      }
    }
  }

  const totalTags = new Set([...normalisedCandidateTags, ...normalisedPlaylist])
    .size; // total unique tags
  const totalMatches = exactMatches + partialMatches; // total matches

  return {
    similarity: totalTags > 0 ? totalMatches / totalTags : 0,
    exactMatches,
    partialMatches,
    matchedTags,
    totalTags,
  };
}

/**
 * Helper function to calculate overlap coefficient for candidate vs playlist sets.
 * @param  {Array} candidateSet - Candidate tags.
 * @param  {...Array} playlistSets - Playlist tags.
 * @return {number} - Average overlap coefficient.
 */
function overlapCoefficient(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // normalise candidate tags
  const candidate = new Set(
    Array.isArray(candidateSet) ? candidateSet : candidateSet
  );

  if (playlistSets.length === 1) {
    // single playlist case
    const playlist = new Set(
      Array.isArray(playlistSets[0]) ? playlistSets[0] : playlistSets[0]
    ); // normalise playlist tags
    const intersection = new Set([...candidate].filter((x) => playlist.has(x))); // find intersection between candidate and playlist
    const minSize = Math.min(candidate.size, playlist.size); // find minimum size
    return minSize > 0 ? intersection.size / minSize : 0; // calculate overlap coefficient
  }

  // multi-playlist case (average overlap)
  const overlaps = playlistSets.map((playlistSet) => {
    const playlist = new Set(
      Array.isArray(playlistSet) ? playlistSet : playlistSet
    ); // normalise playlist tags
    const intersection = new Set([...candidate].filter((x) => playlist.has(x))); // find intersection between candidate and playlist
    const minSize = Math.min(candidate.size, playlist.size); // find minimum size
    return minSize > 0 ? intersection.size / minSize : 0; // calculate overlap coefficient
  });

  return overlaps.reduce((sum, overlap) => sum + overlap, 0) / overlaps.length; // calculate average overlap
}

/**
 * Helper function to calculate comprehensive similarity using multiple Jaccard-based metrics.
 * @param  {Array<string>} candidateTags - Candidate tags.
 * @param  {...Array<string>} playlistTagSets - Playlist tags.
 * @return {Object} - Comprehensive similarity metrics.
 */
function comprehensiveJaccardSimilarity(candidateTags, ...playlistTagSets) {
  if (playlistTagSets.length === 0) {
    return {
      aggregatedSimilarity: 0,
      averageSimilarity: 0,
      maxSimilarity: 0,
      weightedSimilarity: 0,
      overlapSimilarity: 0,
      combinedScore: 0,
    };
  }

  // calculate similarity metrics
  const aggregated = playlistJaccardSimilarity(
    candidateTags,
    ...playlistTagSets
  );
  const average = averageJaccardSimilarity(candidateTags, ...playlistTagSets);
  const maximum = maxJaccardSimilarity(candidateTags, ...playlistTagSets);
  const weighted = weightedJaccardSimilarity(candidateTags, ...playlistTagSets);
  const overlap = overlapCoefficient(candidateTags, ...playlistTagSets);

  // combined score using multiple metrics
  const combinedScore =
    0.3 * aggregated + // similarity to aggregated playlist
    0.3 * average + // average similarity across playlists
    0.2 * weighted.similarity + // weighted similarity with partial matches
    0.1 * overlap + // overlap coefficient
    0.1 * maximum; // best match

  return {
    aggregatedSimilarity: aggregated,
    averageSimilarity: average,
    maxSimilarity: maximum,
    weightedSimilarity: weighted.similarity,
    overlapSimilarity: overlap,
    combinedScore: combinedScore,
    exactMatches: weighted.exactMatches,
    partialMatches: weighted.partialMatches,
    matchedTags: weighted.matchedTags,
  };
}

module.exports = {
  jaccardSimilarity,
  playlistJaccardSimilarity,
  averageJaccardSimilarity,
  maxJaccardSimilarity,
  weightedJaccardSimilarity,
  overlapCoefficient,
  comprehensiveJaccardSimilarity,
};
