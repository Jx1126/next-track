/**
 * Helper function to calculate Jaccard similarity.
 * @param {Set|Array} setA - First set/array.
 * @param {Set|Array} setB - Second set/array.
 * @return {number}        - Similarity score (0-1).
 */
function jaccardSimilarity(setA, setB) {
  const a = new Set(Array.isArray(setA) ? setA : setA);
  const b = new Set(Array.isArray(setB) ? setB : setB);

  const intersection = new Set([...a].filter(x => b.has(x))); // find common elements
  const union = new Set([...a, ...b]); // find all elements

  if (union.size === 0) return 0;
  return intersection.size / union.size;
}
