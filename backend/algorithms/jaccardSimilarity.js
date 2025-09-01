/**
 * Helper function to calculate Jaccard similarity.
 * @param  {Set|Array} setA - First set/array.
 * @param  {Set|Array} setB - Second set/array.
 * @return {number} - Similarity score.
 */
function jaccardSimilarity(setA, setB) {
  const a = new Set(Array.isArray(setA) ? setA : setA);
  const b = new Set(Array.isArray(setB) ? setB : setB);

  const intersection = new Set([...a].filter(x => b.has(x))); // |A ∩ B|
  const union = new Set([...a, ...b]); // |A ∪ B|

  if (union.size === 0) return 0; // avoid division by 0
  return intersection.size / union.size; // |A ∩ B| / |A ∪ B|
}

/**
 * Helper function to calculate Jaccard similarity between candidate and playlist tags.
 * @param  {Set|Array} candidateSet - Candidate tags.
 * @param  {...(Set|Array)} playlistSets - Playlist tags.
 * @return {number} - Similarity score.
 */
function playlistJaccardSimilarity(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // aggregate all playlist tags into a set
  const aggregatedPlaylistTags = new Set();
  playlistSets.forEach(playlistSet => {
    const setArray = Array.isArray(playlistSet) ? playlistSet : Array.from(playlistSet); // convert to array if not already
    setArray.forEach(tag => aggregatedPlaylistTags.add(tag)); // add each tag to the aggregated set
  });
  
  // calculate similarity against aggregated playlist
  return jaccardSimilarity(candidateSet, aggregatedPlaylistTags);
}

/**
 * Helper function to calculate average Jaccard similarity across playlist tracks.
 * @param  {Set|Array} candidateSet - Candidate tags.
 * @param  {...(Set|Array)} playlistSets - Playlist tags.
 * @return {number} - Average similarity score.
 */
function averageJaccardSimilarity(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // calculate similarity for each playlist
  const similarities = playlistSets.map(playlistSet => 
    jaccardSimilarity(candidateSet, playlistSet)
  );

  const total = similarities.reduce((sum, sim) => sum + sim, 0); // sum all similarities

  return total / similarities.length; // calculate average similarity
}

/**
 * Helper function to calculate maximum Jaccard similarity across playlist tracks.
 * @param  {Set|Array} candidateSet - Candidate tags.
 * @param  {...(Set|Array)} playlistSets - Playlist tags.
 * @return {number} - Maximum similarity score.
 */
function maxJaccardSimilarity(candidateSet, ...playlistSets) {
  if (playlistSets.length === 0) return 0;

  // calculate similarity for each playlist
  const similarities = playlistSets.map(playlistSet => 
    jaccardSimilarity(candidateSet, playlistSet)
  );

  return Math.max(...similarities); // calculate maximum similarity score
}

module.exports = {
  jaccardSimilarity,
  playlistJaccardSimilarity,
  averageJaccardSimilarity,
  maxJaccardSimilarity,
};
