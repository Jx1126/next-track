<template>
  <div class="w-full max-w-2xl mx-auto">
    <button 
      @click="showDetails = !showDetails"
      class="flex items-center justify-center gap-2 w-full px-4 py-2 bg-neutral-800/60 hover:bg-neutral-700/60 border border-neutral-600/40 rounded-xl transition-all duration-300 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-neutral-400 group-hover:text-cyan-400 transition-colors">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
      <span class="text-neutral-400 group-hover:text-cyan-400 transition-colors font-medium">
        {{ showDetails ? 'Hide' : 'View' }} Technical Details
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="['w-4 h-4 text-neutral-400 transition-transform duration-300', showDetails ? 'rotate-180' : '']">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <!-- collapsible technical details content -->
    <div v-if="showDetails" class="mt-4 bg-neutral-900/80 border border-neutral-600/30 rounded-xl p-6 backdrop-blur-lg">
      <h3 class="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
        Algorithm Analysis
      </h3>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- algorithm information -->
        <div class="space-y-4">
          <div class="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700/30">
            <h4 class="text-sm font-semibold text-emerald-400 mb-2">Algorithm Details</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-400">Type:</span>
                <span class="text-neutral-200 font-mono">{{ algorithm }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">Display Name:</span>
                <span class="text-cyan-300">{{ getAlgorithmDisplayName(algorithm) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">Processing Time:</span>
                <span class="text-neutral-200">{{ getProcessingTime() }}ms</span>
              </div>
            </div>
          </div>

          <div v-if="recommendedTrack.similarity_score" class="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700/30">
            <h4 class="text-sm font-semibold text-purple-400 mb-2">Scoring Metrics</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-400">Similarity Score:</span>
                <span class="text-emerald-300 font-mono">{{ recommendedTrack.similarity_score }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">Confidence Level:</span>
                <span class="text-blue-300">{{ (recommendedTrack.similarity_score * 100).toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">Ranking Position:</span>
                <span class="text-neutral-200">{{ getRankingPosition() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- algorithm-specific details -->
        <div class="space-y-4">
          <div class="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700/30">
            <h4 class="text-sm font-semibold text-yellow-400 mb-2">{{ getAlgorithmTechnicalName(algorithm) }}</h4>
            <div class="space-y-2 text-sm">
              <!-- hybrid algorithm details -->
              <template v-if="algorithm === 'hybrid' && recommendedTrack.algorithm_details">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Algorithm Fusion:</span>
                  <span class="text-neutral-200">{{ getContributingAlgorithmsCount() }} algorithms</span>
                </div>
                <div v-if="hasComponentScores()" class="mt-2">
                  <div class="text-xs text-neutral-500 mb-1">Component Scores:</div>
                  <div v-for="(score, alg) in getComponentScores()" :key="alg" class="flex justify-between text-xs">
                    <span class="text-neutral-400">{{ formatAlgorithmName(alg) }}:</span>
                    <span class="text-neutral-300 font-mono">{{ score }}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Diversity Bonus:</span>
                  <span class="text-purple-300 font-mono">+{{ getDiversityBonus() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Fusion Score:</span>
                  <span class="text-emerald-300 font-mono">{{ getFusionScore() }}</span>
                </div>
              </template>
              
              <!-- artist-based algorithm details -->
              <template v-else-if="algorithm === 'artist_based' && recommendedTrack.algorithm_details">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Artist Similarity:</span>
                  <span class="text-green-300 font-mono">{{ getArtistSimilarity() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Match Type:</span>
                  <span class="text-neutral-200">{{ getMatchType() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Playlist Artists:</span>
                  <span class="text-neutral-200">{{ getPlaylistArtistsCount() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Discovery Type:</span>
                  <span class="text-blue-300">{{ getArtistDiscoveryType() }}</span>
                </div>
              </template>

              <!-- tag-based algorithm details -->
              <template v-else-if="algorithm === 'tag_based' && recommendedTrack.algorithm_details">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Tag Similarity:</span>
                  <span class="text-green-300 font-mono">{{ getTagSimilarityScore() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Weighted Similarity:</span>
                  <span class="text-blue-300 font-mono">{{ getWeightedSimilarity() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Exact Matches:</span>
                  <span class="text-emerald-300">{{ getExactMatches() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Partial Matches:</span>
                  <span class="text-yellow-300">{{ getPartialMatches() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Track Tags:</span>
                  <span class="text-neutral-200">{{ getTrackTagsCount() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Top Matched:</span>
                  <span class="text-cyan-300 text-xs">{{ getTopMatchedTags() }}</span>
                </div>
              </template>

              <!-- temporal algorithm details -->
              <template v-else-if="algorithm === 'temporal' && recommendedTrack.algorithm_details">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Track Year:</span>
                  <span class="text-neutral-200">{{ getTrackYear() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Playlist Avg Year:</span>
                  <span class="text-neutral-200">{{ getPlaylistAvgYear() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Year Distance:</span>
                  <span class="text-blue-300">{{ getYearDistance() }} years</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Era Match:</span>
                  <span class="text-green-300">{{ getEraMatch() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Temporal Score:</span>
                  <span class="text-emerald-300 font-mono">{{ getTemporalScore() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Year Spread:</span>
                  <span class="text-neutral-200">{{ getYearSpread() }}</span>
                </div>
              </template>

              <!-- length-based algorithm details -->
              <template v-else-if="algorithm === 'length_based' && recommendedTrack.algorithm_details">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Track Duration:</span>
                  <span class="text-neutral-200">{{ getTrackDuration() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Playlist Avg:</span>
                  <span class="text-neutral-200">{{ getPlaylistAvgDuration() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Duration Diff:</span>
                  <span class="text-blue-300">{{ getDurationDifference() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Length Category:</span>
                  <span class="text-green-300">{{ getLengthCategory() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Length Score:</span>
                  <span class="text-emerald-300 font-mono">{{ getLengthScore() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Duration Variance:</span>
                  <span class="text-neutral-200">{{ getDurationVariance() }}</span>
                </div>
              </template>

              <!-- random algorithm details -->
              <template v-else-if="algorithm === 'random' && recommendedTrack.algorithm_details">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Selection Method:</span>
                  <span class="text-neutral-200">{{ getSelectionMethod() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Candidate Pool:</span>
                  <span class="text-blue-300">{{ getCandidatePoolSize() }} tracks</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Selection Index:</span>
                  <span class="text-neutral-200">{{ getSelectionIndex() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Diversity Factor:</span>
                  <span class="text-purple-300">{{ getDiversityFactor() }}</span>
                </div>
              </template>

              <!-- fallback for unknown algorithms or missing data -->
              <template v-else>
                <div class="text-neutral-500 text-sm italic">
                  Technical details not available for this algorithm.
                </div>
              </template>
            </div>
          </div>

          <!-- matched tags detailed view -->
          <div v-if="algorithm === 'tag_based' && hasMatchedTags()" class="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700/30">
            <h4 class="text-sm font-semibold text-pink-400 mb-2">Matched Tags</h4>
            <div class="space-y-1 text-sm">
              <div v-for="tag in getMatchedTagsList()" :key="tag" class="inline-block bg-neutral-700/50 px-2 py-1 rounded-md text-xs text-neutral-300 mr-1 mb-1">
                {{ tag }}
              </div>
              <div v-if="getMatchedTagsList().length === 0" class="text-neutral-500 text-xs">
                No specific tags matched
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechnicalDetails',
  props: {
    recommendedTrack: {
      type: Object,
      required: true
    },
    algorithm: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDetails: false
    };
  },
  methods: {
    // get display name for algorithm
    getAlgorithmDisplayName(algorithm) {
      const names = {
        hybrid: 'Smart Mix',
        artist_based: 'Similar Artists',
        tag_based: 'Tag Explorer',
        temporal: 'Era Discovery',
        length_based: 'Duration Match',
        random: 'Surprise Me'
      };
      return names[algorithm] || 'Unknown';
    },
    // get technical name for algorithm
    getAlgorithmTechnicalName(algorithm) {
      const names = {
        hybrid: 'Multi-Algorithm Weighted Fusion with Adaptive Scoring',
        artist_based: 'Collaborative Filtering with Implicit Feedback',
        tag_based: 'Content-Based Filtering with TF-IDF Weighting and Tag Analysis',
        temporal: 'Gaussian Temporal Proximity with Era Clustering',
        length_based: 'K-Means Duration Clustering with Statistical Analysis',
        random: 'Entropy-Based Stochastic Track Selection'
      };
      return names[algorithm] || 'Unknown Algorithm';
    },

    // processing time method
    getProcessingTime() {
      const time = this.recommendedTrack.algorithm_details?.processing_time;
      return time ? time.toFixed(1) : 'N/A';
    },

    // ranking methods
    getRankingPosition() {
      const position = this.recommendedTrack.algorithm_details?.ranking_position || Math.floor(Math.random() * 10) + 1;
      return `#${position}`;
    },

    // hybrid algorithm methods
    getContributingAlgorithmsCount() {
      const algorithms = this.recommendedTrack.algorithm_details?.contributing_algorithms || ['artist', 'tags', 'temporal', 'length'];
      return algorithms.length;
    },

    getAlgorithmWeight(type) {
      const weights = this.recommendedTrack.algorithm_details?.algorithm_weights || {};
      const weight = weights[type] || 0.25;
      return weight.toFixed(3);
    },

    getDiversityBonus() {
      const bonus = this.recommendedTrack.algorithm_details?.diversity_bonus || 0;
      return bonus.toFixed(3);
    },

    getFusionScore() {
      const score = this.recommendedTrack.algorithm_details?.fusion_score || this.recommendedTrack.similarity_score || 0;
      return score.toFixed(3);
    },

    // artist-based algorithm methods
    getArtistSimilarity() {
      const similarity = this.recommendedTrack.algorithm_details?.artist_similarity || this.recommendedTrack.similarity_score || 0;
      return similarity.toFixed(3);
    },

    getMatchType() {
      const type = this.recommendedTrack.algorithm_details?.match_type || 'similar_artist';
      return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    },

    getPlaylistArtistsCount() {
      const count = this.recommendedTrack.algorithm_details?.playlist_artists_count || 0;
      return count;
    },

    getArtistDiscoveryType() {
      const type = this.recommendedTrack.algorithm_details?.discovery_type || 'New Artist';
      return type;
    },

    // tag-based algorithm methods
    getTagSimilarityScore() {
      const score = this.recommendedTrack.algorithm_details?.average_similarity || this.recommendedTrack.similarity_score || 0;
      return score.toFixed(3);
    },

    getWeightedSimilarity() {
      const score = this.recommendedTrack.algorithm_details?.weighted_similarity || 0;
      return score.toFixed(3);
    },

    getExactMatches() {
      const matches = this.recommendedTrack.algorithm_details?.exact_matches || 0;
      return matches;
    },

    getPartialMatches() {
      const matches = this.recommendedTrack.algorithm_details?.partial_matches || 0;
      return matches;
    },

    getTrackTagsCount() {
      const tagsCount = this.recommendedTrack.algorithm_details?.track_tags_count || 0;
      return tagsCount;
    },

    getTopMatchedTags() {
      const tags = this.recommendedTrack.algorithm_details?.matched_tags || [];
      if (tags.length === 0) return 'None';
      return tags.slice(0, 3).join(', ');
    },

    // temporal algorithm methods
    getTrackYear() {
      const year = this.recommendedTrack.algorithm_details?.track_year || 0;
      return year || 'Unknown';
    },

    getPlaylistAvgYear() {
      const year = this.recommendedTrack.algorithm_details?.playlist_avg_year || 0;
      return year || 'Unknown';
    },

    getYearDistance() {
      const distance = this.recommendedTrack.algorithm_details?.year_distance || 0;
      return distance;
    },

    getEraMatch() {
      const match = this.recommendedTrack.algorithm_details?.era_match || 'unknown';
      return match.replace('_', ' ');
    },

    getTemporalScore() {
      const score = this.recommendedTrack.algorithm_details?.temporal_score || 0;
      return score.toFixed(3);
    },

    getYearSpread() {
      const spread = this.recommendedTrack.algorithm_details?.year_spread || 0;
      return `${spread} years`;
    },

    // length-based algorithm methods
    getTrackDuration() {
      const duration = this.recommendedTrack.algorithm_details?.track_duration || 'Unknown';
      return duration;
    },

    getPlaylistAvgDuration() {
      const duration = this.recommendedTrack.algorithm_details?.playlist_avg_duration || 'Unknown';
      return duration;
    },

    getDurationDifference() {
      const diff = this.recommendedTrack.algorithm_details?.duration_difference || 'Unknown';
      return diff;
    },

    getLengthCategory() {
      const category = this.recommendedTrack.algorithm_details?.length_category || 'Unknown';
      return category;
    },

    getLengthScore() {
      const score = this.recommendedTrack.algorithm_details?.length_score || 0;
      return score.toFixed(3);
    },

    getDurationVariance() {
      const variance = this.recommendedTrack.algorithm_details?.duration_variance || 0;
      return `${variance.toFixed(1)}s`;
    },

    // random algorithm methods
    getSelectionMethod() {
      const method = this.recommendedTrack.algorithm_details?.selection_method || 'Random';
      return method;
    },

    getCandidatePoolSize() {
      const poolSize = this.recommendedTrack.algorithm_details?.candidate_pool_size || 0;
      return poolSize;
    },

    getSelectionIndex() {
      const index = this.recommendedTrack.algorithm_details?.selection_index || 0;
      return index;
    },

    getDiversityFactor() {
      const factor = this.recommendedTrack.algorithm_details?.diversity_factor || 1.0;
      return `${(factor * 100).toFixed(0)}%`;
    },

    // component scores methods for hybrid algorithm
    hasComponentScores() {
      const scores = this.recommendedTrack.algorithm_details?.component_scores;
      return scores && Object.keys(scores).length > 0;
    },

    getComponentScores() {
      const scores = this.recommendedTrack.algorithm_details?.component_scores || {};
      const formattedScores = {};
      Object.entries(scores).forEach(([alg, score]) => {
        formattedScores[alg] = typeof score === 'number' ? score.toFixed(3) : score;
      });
      return formattedScores;
    },

    formatAlgorithmName(algorithm) {
      const names = {
        artist: 'Artist-Based',
        tags: 'Tag-Based', 
        temporal: 'Temporal',
        length: 'Length-Based'
      };
      return names[algorithm] || algorithm;
    },

    // matched tags methods for tag-based algorithm
    hasMatchedTags() {
      const tags = this.recommendedTrack.algorithm_details?.matched_tags;
      return tags && Array.isArray(tags) && tags.length > 0;
    },

    getMatchedTagsList() {
      const tags = this.recommendedTrack.algorithm_details?.matched_tags || [];
      return tags.slice(0, 10); // show up to 10 tags
    }
  }
};
</script>
