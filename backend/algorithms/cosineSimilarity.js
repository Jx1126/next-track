/**
 * Helper function to calculate cosine similarity between two vectors.
 * @param  {Array<number>} vectorA - First feature vector.
 * @param  {Array<number>} vectorB - Second feature vector.
 * @return {number} - Similarity score.
 */
function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i]; // Σ (A[i] * B[i])
    normA += vectorA[i] * vectorA[i]; // Σ (A[i]^2)
    normB += vectorB[i] * vectorB[i]; // Σ (B[i]^2)
  }

  if (normA === 0 || normB === 0) {
    return 0; // avoid division by 0
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)); // dot(A,B) / (||A|| * ||B||)
}

/**
 * Helper function to calculate comprehensive cosine similarity metrics.
 * @param  {Array<number>} candidateVector - Feature vector of candidate track.
 * @param  {Array<Array<number>>} playlistVectors - Feature vectors of playlist tracks.
 * @return {Object} - Comprehensive similarity metrics.
 */
function comprehensiveCosineSimilarity(candidateVector, playlistVectors) {
  // validation: must contain at least one playlist vector
  if (playlistVectors.length === 0) {
    return {
      averageSimilarity: 0,
      maxSimilarity: 0,
      combinedScore: 0
    };
  }

  // calculate cosine similarity for each playlist vector
  const similarities = playlistVectors.map(playlistVector => 
    cosineSimilarity(candidateVector, playlistVector)
  );

  const total = similarities.reduce((sum, sim) => sum + sim, 0); // sum all similarities

  // average and maximum similarity
  const average = total / similarities.length;
  const maximum = Math.max(...similarities);

  // combined score of average and maximum similarity with different weights
  const combinedScore = 0.7 * average + 0.3 * maximum;

  return {
    averageSimilarity: average,
    maxSimilarity: maximum,
    combinedScore: combinedScore,
    similarities: similarities
  };
}

module.exports = {
  cosineSimilarity,
  comprehensiveCosineSimilarity
};
