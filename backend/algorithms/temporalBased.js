const { extractTrackFeatures, extractYear } = require("../utils/trackFeatures");

/**
 * Helper function to recommend tracks based on temporal similarity
 * @param   {Array} candidateTracks - Pool of tracks to recommend from.
 * @param   {Array} playlistTracks - User's playlist tracks.
 * @param   {number} timestamp - Random seed for deterministic results.
 * @returns {Object|null} Recommended track with metadata.
 */
function recommendByTemporal(candidateTracks, playlistTracks, timestamp) {
  // extract temporal profile from playlist
  const playlistTemporalProfile = buildTemporalProfile(playlistTracks);

  if (!playlistTemporalProfile.hasValidDates) {
    // fallback: use candidate track years and estimate temporal relevance
    const candidateYears = candidateTracks
      .map((track) => extractYear(track))
      .filter((year) => year > 0);

    if (candidateYears.length === 0) {
      const randomTrack = selectRandomTrack(candidateTracks, timestamp);
      return {
        ...randomTrack,
        similarity_score: "0.000",
        algorithm_details: {
          track_year: "Unknown",
          playlist_avg_year: "Unknown",
          year_distance: 0,
          era_match: "unknown",
          temporal_score: 0.0,
          year_spread: 0,
          fallback_reason:
            "No valid years found in playlist or candidate tracks",
        },
      };
    }

    // use modern era as baseline (last 20 years)
    const currentYear = new Date().getFullYear();

    const scoredTracks = candidateTracks.map((track) => {
      const trackYear = extractYear(track);
      const score =
        trackYear > 0
          ? Math.max(0, 1 - Math.abs(trackYear - currentYear) / 50)
          : 0;
      return { ...track, temporalScore: score, trackYear };
    });

    const validTracks = scoredTracks.filter((track) => track.temporalScore > 0);
    if (validTracks.length === 0) {
      const randomTrack = selectRandomTrack(candidateTracks, timestamp);
      return {
        ...randomTrack,
        similarity_score: "0.000",
        algorithm_details: {
          track_year: "Unknown",
          playlist_avg_year: "Legacy playlist (no year data)",
          year_distance: 0,
          era_match: "unknown",
          temporal_score: 0.0,
          year_spread: 0,
          fallback_reason: "No temporal scoring possible",
        },
      };
    }

    validTracks.sort((a, b) => b.temporalScore - a.temporalScore);
    const selectedTrack = validTracks[0];

    return {
      ...selectedTrack,
      similarity_score: selectedTrack.temporalScore.toFixed(3),
      algorithm_details: {
        track_year: selectedTrack.trackYear || "Unknown",
        playlist_avg_year: "Legacy playlist (no year data)",
        year_distance: 0,
        era_match: "modern era preference",
        temporal_score: selectedTrack.temporalScore,
        year_spread: 0,
        fallback_reason:
          "Using recency preference for legacy playlist without year data",
      },
    };
  }

  // score candidates based on temporal similarity
  const scoredTracks = candidateTracks.map((track) => {
    const trackFeatures = extractTrackFeatures(track);
    const trackYear = trackFeatures.year;

    // calculate temporal similarity
    const temporalScore = calculateTemporalSimilarity(
      trackYear,
      playlistTemporalProfile
    );

    // era consistency bonus
    const eraBonus = calculateEraBonus(
      trackYear,
      playlistTemporalProfile.avgYear
    );

    // decade clustering bonus
    const decadeBonus = calculateDecadeBonus(
      trackYear,
      playlistTemporalProfile.decadeDistribution
    );

    // combined temporal score
    const totalScore = 0.5 * temporalScore + 0.3 * eraBonus + 0.2 * decadeBonus;

    // add random factor
    const randomFactor = ((timestamp + track.title.length) % 100) / 1000;

    return {
      ...track,
      temporalScore: totalScore + randomFactor,
      trackYear,
      explanation: formatTemporalExplanation(
        trackYear,
        playlistTemporalProfile.avgYear
      ),
    };
  });

  // filter tracks with valid years and temporal relevance
  const validTracks = scoredTracks.filter(
    (track) => track.trackYear > 0 && track.temporalScore > 0.1
  );

  if (validTracks.length === 0) {
    return selectRandomTrack(candidateTracks, timestamp);
  }

  // sort by temporal score
  validTracks.sort((a, b) => b.temporalScore - a.temporalScore);

  // select from top candidates
  const topCandidates = validTracks.slice(0, Math.min(6, validTracks.length));
  const randomIndex =
    (timestamp + Math.floor(Math.random() * topCandidates.length)) %
    topCandidates.length;
  const selectedTrack = topCandidates[randomIndex];

  return {
    ...selectedTrack,
    similarity_score: selectedTrack.temporalScore.toFixed(3),
    algorithm_details: {
      track_year: selectedTrack.trackYear,
      playlist_avg_year: playlistTemporalProfile.avgYear,
      year_distance: Math.abs(
        selectedTrack.trackYear - playlistTemporalProfile.avgYear
      ),
      era_match: calculateEraMatch(
        selectedTrack.trackYear,
        playlistTemporalProfile.avgYear
      ),
      temporal_score: selectedTrack.temporalScore,
      year_spread: playlistTemporalProfile.yearSpread,
      playlist_year_range: {
        min: playlistTemporalProfile.minYear,
        max: playlistTemporalProfile.maxYear,
      },
      decade_distribution: getDominantDecades(
        playlistTemporalProfile.decadeDistribution
      ),
      track_decade: Math.floor(selectedTrack.trackYear / 10) * 10,
      gaussian_sigma: Math.max(playlistTemporalProfile.yearSpread, 5),
      similarity_components: {
        gaussian_similarity: calculateTemporalSimilarity(
          selectedTrack.trackYear,
          playlistTemporalProfile
        ).toFixed(3),
        era_bonus: calculateEraBonus(
          selectedTrack.trackYear,
          playlistTemporalProfile.avgYear
        ).toFixed(3),
        decade_bonus: calculateDecadeBonus(
          selectedTrack.trackYear,
          playlistTemporalProfile.decadeDistribution
        ).toFixed(3),
      },
    },
  };
}

/**
 * Helper function to build temporal profile from playlist tracks
 * @param {Array} tracks - Playlist tracks.
 * @returns {Object} Temporal profile with statistics.
 */
function buildTemporalProfile(tracks) {
  // validation: tracks must be a non-empty array
  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    return { hasValidDates: false };
  }

  const years = tracks
    .map((track) => extractYear(track))
    .filter((year) => year > 0);

  if (years.length === 0) {
    return { hasValidDates: false };
  }

  // calculate average year and spread
  const avgYear = years.reduce((sum, year) => sum + year, 0) / years.length;
  const yearSpread = Math.sqrt(
    years.reduce((sum, year) => sum + Math.pow(year - avgYear, 2), 0) /
      years.length
  );

  // build decade distribution
  const decadeDistribution = new Map();
  years.forEach((year) => {
    const decade = Math.floor(year / 10) * 10;
    decadeDistribution.set(decade, (decadeDistribution.get(decade) || 0) + 1);
  });

  return {
    hasValidDates: true,
    years,
    avgYear: Math.round(avgYear),
    yearSpread: Math.round(yearSpread),
    minYear: Math.min(...years),
    maxYear: Math.max(...years),
    decadeDistribution,
  };
}

/**
 * Helper function to calculate temporal similarity using Gaussian proximity
 * @param   {number} trackYear - Candidate track year.
 * @param   {Object} profile - Playlist temporal profile.
 * @returns {number} Temporal similarity score.
 */
function calculateTemporalSimilarity(trackYear, profile) {
  if (trackYear === 0) return 0;

  const yearDistance = Math.abs(trackYear - profile.avgYear);
  const sigma = Math.max(profile.yearSpread, 5); // minimum spread of 5 years

  // gaussian similarity with temporal decay
  const gaussianSimilarity = Math.exp(
    -Math.pow(yearDistance, 2) / (2 * Math.pow(sigma, 2))
  );

  return gaussianSimilarity;
}

/**
 * Helper function to calculate era bonus for tracks from the same musical era
 * @param {number} trackYear - Candidate track year.
 * @param {number} playlistAvgYear - Playlist average year.
 * @returns {number} Era bonus score.
 */
function calculateEraBonus(trackYear, playlistAvgYear) {
  if (trackYear === 0) return 0;

  const yearDiff = Math.abs(trackYear - playlistAvgYear); // absolute year difference

  // era boundaries
  if (yearDiff <= 5) return 1.0; // same era
  if (yearDiff <= 10) return 0.7; // adjacent era
  if (yearDiff <= 20) return 0.4; // same generation

  return 0.1; // different era
}

/**
 * Helper function to calculate decade clustering bonus
 * @param   {number} trackYear - Candidate track year.
 * @param   {Map} decadeDistribution - Playlist decade distribution.
 * @returns {number} Decade bonus score.
 */
function calculateDecadeBonus(trackYear, decadeDistribution) {
  if (trackYear === 0) return 0;

  const trackDecade = Math.floor(trackYear / 10) * 10; // 1994 -> 1990
  const decadeCount = decadeDistribution.get(trackDecade) || 0; // count of tracks in that decade
  const totalTracks = Array.from(decadeDistribution.values()) // total tracks
    .reduce((sum, count) => sum + count, 0);

  if (totalTracks === 0) return 0;

  // normalise by decade frequency in playlist
  return decadeCount / totalTracks;
}

/**
 * Helper function to determine era match category
 * @param   {number} trackYear - Track year.
 * @param   {number} playlistYear - Playlist average year.
 * @returns {string} Era match category.
 */
function calculateEraMatch(trackYear, playlistYear) {
  const yearDiff = Math.abs(trackYear - playlistYear);

  if (yearDiff <= 3) return "exact_era";
  if (yearDiff <= 8) return "close_era";
  if (yearDiff <= 15) return "same_generation";
  return "different_era";
}

/**
 * Helper function to format explanation for temporal recommendation
 * @param   {number} trackYear - Track release year.
 * @param   {number} playlistAvgYear - Playlist average year.
 * @returns {string} Readable explanation.
 */
function formatTemporalExplanation(trackYear, playlistAvgYear) {
  if (trackYear === 0) return "Era exploration (unknown year)";

  const yearDiff = Math.abs(trackYear - playlistAvgYear); // absolute year difference

  if (yearDiff <= 3) {
    return `Same era (${trackYear})`;
  } else if (yearDiff <= 8) {
    return `Similar era (${trackYear})`;
  } else if (yearDiff <= 15) {
    return `Same generation (${trackYear})`;
  } else {
    return `Era exploration (${trackYear})`;
  }
}

/**
 * Helper function to fallback to random selection
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
    explanation: "Temporal discovery (random selection)",
    algorithm_details: {
      score_breakdown: {
        selection_method: "random_fallback",
        reason: "insufficient_temporal_data",
      },
    },
  };
}

/**
 * Helper function to get dominant decades from distribution
 * @param   {Map} decadeDistribution - Distribution of decades
 * @returns {Array} Top 3 decades with counts
 */
function getDominantDecades(decadeDistribution) {
  const sorted = Array.from(decadeDistribution.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return sorted.map(([decade, count]) => ({ decade, count }));
}

module.exports = {
  recommendByTemporal,
  buildTemporalProfile,
  calculateTemporalSimilarity,
};
