/**
 * Helper function to extract features from a track object.
 * @param {Object} track - Track object.
 * @returns {Object}     - Extracted features in an object.
 */
function extractTrackFeatures(track) {
  // validation: track must exist
  if (!track) {
    return {
      allTags: [],
      artist: '',
      album: '',
      title: '',
      year: null,
      duration: null
    };
  }

  try {
    let allTags = [];

    // push tags into allTags if they exist and are arrays
    if (track.tags && Array.isArray(track.tags)) {
      allTags = [...track.tags];
    } else if (track.style && Array.isArray(track.style)) {
      allTags = [...track.style];
    }

    // push artist tag if available
    if (track.artist && typeof track.artist === 'string') {
      allTags.push(`artist:${track.artist.toLowerCase()}`);
    }
    // push album tag if available
    if (track.album && typeof track.album === 'string') {
      allTags.push(`album:${track.album.toLowerCase()}`);
    }
    // push year/decade tags if available
    let year = null;
    if (track.year || track.release_year || track.release_date || track.date) {
      if (track.year && !isNaN(track.year)) {
        year = parseInt(track.year);
      } else if (track.release_year && !isNaN(track.release_year)) {
        year = parseInt(track.release_year);
      } else if (track.release_date) {
        // handle MusicBrainz release_date format: "2020", "2020-05", "2020-05-15"
        const dateStr = track.release_date.toString();
        const yearFromDate = parseInt(dateStr.substring(0, 4));
        if (!isNaN(yearFromDate) && yearFromDate > 1900 && yearFromDate <= new Date().getFullYear()) {
          year = yearFromDate;
        }
      } else if (track.date) {
        year = new Date(track.date).getFullYear();
      }
      
      if (year && !isNaN(year)) {
        const decade = Math.floor(year / 10) * 10; // decade tag
        allTags.push(`decade:${decade}s`);
        allTags.push(`year:${year}`);
      }
    }

    // normalise tags and remove duplicates
    allTags = allTags
      .filter(tag => tag && typeof tag === 'string' && tag.trim().length > 0)
      .map(tag => tag.toLowerCase().trim())
      .filter((tag, index, arr) => arr.indexOf(tag) === index); // remove duplicates

    return {
      allTags,
      artist: track.artist || '',
      album: track.album || '',
      title: track.title || '',
      year: year || track.year || track.release_year || null,
      duration: track.duration || track.length || null,
      originalTrack: track
    };
  } catch (error) {
    console.warn(`Track feature extraction failed for "${track.title || 'unknown'}":`, error.message);
    return {
      allTags: [],
      artist: track.artist || '',
      album: track.album || '',
      title: track.title || '',
      year: null,
      duration: null,
      originalTrack: track
    };
  }
}

/**
 * Helper function to extract artist name from input track.
 * @param {Object} track - Track object.
 * @return {string}      - Artist name.
 */
function extractArtist(track) {
  // extract artist name from track if available
  return track && track.artist ? track.artist.trim() : '';
}

/**
 * Helper function to extract tags from track.
 * @param {Object} track - Track object.
 * @return {Array}       - Array of tag strings.
 */
function extractTags(track) {
  if (!track) return []; // validation: must be a valid track object
  // extract features from track and filter out artist/album tags
  const features = extractTrackFeatures(track);
  return features.allTags.filter(tag => !tag.startsWith('artist:') && !tag.startsWith('album:'));
}

/**
 * Helper fucntion to extract year from track.
 * @param {Object} track - Track object.
 * @return {number|null} - Year or null.
 */
function extractYear(track) {
  if (!track) return null; // validation: must be a valid track object
  
  // extract year, release year from track
  if (track.year && !isNaN(track.year)) return parseInt(track.year);
  if (track.release_year && !isNaN(track.release_year)) return parseInt(track.release_year);
  
  // extract year from release_date field (MusicBrainz format)
  if (track.release_date) {
    // handle different date formats: "2020", "2020-05", "2020-05-15"
    const dateStr = track.release_date.toString();
    const year = parseInt(dateStr.substring(0, 4));
    if (!isNaN(year) && year > 1900 && year <= new Date().getFullYear()) {
      return year;
    }
  }
  
  // extract and return full year from track date or null
  if (track.date) {
    const year = new Date(track.date).getFullYear();
    return !isNaN(year) ? year : null;
  }
  
  return null;
}

/**
 * Helper function to extract duration from track in seconds.
 * @param {Object} track - Track object.
 * @return {number|null} - Duration in seconds or null.
 */
function extractDuration(track) {
  if (!track) return null; // validation: must be a valid track object
  // extract duration and length from track
  if (track.duration && !isNaN(track.duration)) return parseFloat(track.duration);
  if (track.length && !isNaN(track.length)) return parseFloat(track.length);
  return null;
}

module.exports = {
  extractTrackFeatures,
  extractArtist,
  extractTags,
  extractYear,
  extractDuration
};
