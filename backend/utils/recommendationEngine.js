const { generateYoutubeLink } = require('./youtubeLinkGenerator');
const { searchMusicBrainzTracks } = require('./musicbrainz');

const { recommendByArtist } = require('../algorithms/artistBased');
const { recommendByTags } = require('../algorithms/tagBased');
const { recommendByTemporal } = require('../algorithms/temporalBased');
const { recommendByLength } = require('../algorithms/lengthBased');
const { recommendByHybrid } = require('../algorithms/hybridBased');
const { recommendByRandom } = require('../algorithms/randomBased');

// algorithm types
const ALGORITHM_TYPES = {
  HYBRID: 'hybrid',              // balanced recommendation with diversity
  ARTIST_BASED: 'artist_based',  // focus on artists from playlist
  TAG_BASED: 'tag_based',        // focus on tags from playlist
  TEMPORAL: 'temporal',          // focus on similar era/release year
  LENGTH_BASED: 'length_based',  // focus on similar track duration
  RANDOM: 'random'               // pure discovery
};

// recommendation config to control external data fetching
const RECOMMENDATION_CONFIG = {
  MAX_EXTERNAL_TRACKS: 50
};

/**
 * Helper function to generate a track recommendation based on selected algorithm.
 * @param   {Array} tracks - User's playlist tracks.
 * @param   {string} algorithmType - Selected algorithm type.
 * @returns {Object|null} - Recommended track with metadata.
 */
async function generateRecommendation(tracks, algorithmType = 'hybrid') {
  // map frontend algorithm names to backend algorithm types
  const algorithmMap = {
    'artist_based': ALGORITHM_TYPES.ARTIST_BASED,
    'tag_based': ALGORITHM_TYPES.TAG_BASED,
    'temporal': ALGORITHM_TYPES.TEMPORAL,
    'length_based': ALGORITHM_TYPES.LENGTH_BASED,
    'hybrid': ALGORITHM_TYPES.HYBRID,
    'random': ALGORITHM_TYPES.RANDOM
  };
  
  const selectedAlgorithm = algorithmMap[algorithmType] || ALGORITHM_TYPES.HYBRID;
  
  // get external tracks from MusicBrainz
  let externalTracks = [];
  try {
    // extract artists and tags from playlist tracks
    const artists = [...new Set(tracks.map(track => track.artist).filter(artist => artist))];
    const allTags = tracks.flatMap(track => track.tags || []).filter(tag => tag);
    const tags = [...new Set(allTags)];

    // create search query object
    const searchQuery = {
      artists: artists,
      tags: tags
    };
    
    externalTracks = await searchMusicBrainzTracks(searchQuery, RECOMMENDATION_CONFIG.MAX_EXTERNAL_TRACKS); // fetch tracks from MusicBrainz
  } catch (error) {
    console.warn('MusicBrainz discovery failed:', error.message);
    return null;
  }

  // filter out playlist tracks
  const playlistTrackKeys = new Set(tracks.map(track => `${track.title}-${track.artist}`.toLowerCase()));
  const filteredTracks = externalTracks.filter(track => {
    const trackKey = `${track.title}-${track.artist}`.toLowerCase();
    return !playlistTrackKeys.has(trackKey);
  });

  if (filteredTracks.length === 0) {
    console.warn('No external tracks found');
    return null;
  }

  let recommended_track;
  const timestamp = Date.now();

  try {
    switch (selectedAlgorithm) {
      case ALGORITHM_TYPES.HYBRID:
        recommended_track = recommendByHybrid(filteredTracks, tracks, timestamp);
        break;
      case ALGORITHM_TYPES.ARTIST_BASED:
        recommended_track = recommendByArtist(filteredTracks, tracks, timestamp);
        break;
      case ALGORITHM_TYPES.TAG_BASED:
        recommended_track = recommendByTags(filteredTracks, tracks, timestamp);
        break;
      case ALGORITHM_TYPES.TEMPORAL:
        recommended_track = recommendByTemporal(filteredTracks, tracks, timestamp);
        break;
      case ALGORITHM_TYPES.LENGTH_BASED:
        recommended_track = recommendByLength(filteredTracks, tracks, timestamp);
        break;
      case ALGORITHM_TYPES.RANDOM:
      default:
        recommended_track = recommendByRandom(filteredTracks, timestamp);
        break;
    }
  } catch (error) {
    console.error(`Algorithm ${selectedAlgorithm} failed:`, error.message);
    // fallback to random recommendation
    recommended_track = recommendByRandom(filteredTracks, timestamp);
  }

  if (!recommended_track) {
    console.warn('No recommendation generated');
    return null;
  }

  // generate YouTube link
  const youtube_link = await generateYoutubeLink(recommended_track.title, recommended_track.artist);

  return {
    ...recommended_track,
    youtube_link,
    algorithm_used: selectedAlgorithm,
    recommended_at: new Date().toISOString()
  };
}

module.exports = {
  generateRecommendation,
  ALGORITHM_TYPES,
  RECOMMENDATION_CONFIG
};
