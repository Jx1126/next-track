/**
 * Helper function to calculate cosine similarity between two vectors.
 * @param {Array<number>} vectorA - First feature vector.
 * @param {Array<number>} vectorB - Second feature vector.
 * @return {number}               - Similarity score.
 */
function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i]; 
    normB += vectorB[i] * vectorB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0; // avoid division by 0
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

module.exports = {
  cosineSimilarity,
};
