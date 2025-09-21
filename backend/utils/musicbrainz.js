const axios = require("axios");

// MusicBrainz API base configs
const musicbrainz_url = "https://musicbrainz.org/ws/2/";
const user_agent = "NextTrack (https://github.com/Jx1126/next-track)"; // required by MusicBrainz for proper request identification

/**
 * Helper function to create a request to MusicBrainz API
 * @param {string} endpoint - MusicBrainz API
 * @param {object} query - Query parameters for the API request
 * @returns {Promise<object>} - Response data from MusicBrainz API
 */
async function createMusicBrainzRequest(endpoint, query = {}) {
  try {
    const response = await axios.get(`${musicbrainz_url}${endpoint}`, {
      params: {
        fmt: "json",
        ...query,
      },
      headers: {
        "User-Agent": user_agent, // required by MusicBrainz API guidelines
      },
      timeout: 10000, // timeout to prevent long requests
    });
    return response.data;
  } catch (error) {
    console.error(`MusicBrainz API error: ${error.message}`);
    throw new Error(`MusicBrainz API request failed: ${error.message}`);
  }
}

/**
 * Helper function to search for tracks by artist
 * @param   {string} artistName - Name of the artist to search for
 * @param   {number} limit - Number of tracks to return (default: 25)
 * @returns {Promise<Array>} - Array of track objects
 */
async function searchTracksByArtist(artistName, limit = 25) {
  try {
    const response = await createMusicBrainzRequest("recording", {
      query: `artist:"${artistName}"`,
      limit: limit,
      inc: "artist-credits+releases+tags",
    });

    if (!response.recordings || response.recordings.length === 0) {
      return [];
    }

    return response.recordings.map((recording) => ({
      id: recording.id,
      title: recording.title,
      artist: recording["artist-credit"]
        ? recording["artist-credit"][0].name
        : artistName,
      length: recording.length,
      release_date:
        recording.releases && recording.releases[0]
          ? recording.releases[0].date
          : null,
      musicbrainz_id: recording.id,
      tags: recording.tags ? recording.tags.map((tag) => tag.name) : [],
    }));
  } catch (error) {
    console.warn(
      `Failed to search tracks by artist ${artistName}:`,
      error.message
    );
    return [];
  }
}

/**
 * Helper function to search for tracks by tag
 * @param   {string} tag - Tag to search for
 * @param   {number} limit - Number of tracks to return (default: 25)
 * @returns {Promise<Array>} - Array of track objects
 */
async function searchTracksByTag(tag, limit = 25) {
  try {
    const response = await createMusicBrainzRequest("recording", {
      query: `tag:"${tag}"`,
      limit: limit,
      inc: "artist-credits+releases+tags",
    });

    if (!response.recordings || response.recordings.length === 0) {
      return [];
    }

    return response.recordings.map((recording) => ({
      id: recording.id,
      title: recording.title,
      artist: recording["artist-credit"]
        ? recording["artist-credit"][0].name
        : "Unknown Artist",
      length: recording.length,
      release_date:
        recording.releases && recording.releases[0]
          ? recording.releases[0].date
          : null,
      musicbrainz_id: recording.id,
      tags: recording.tags ? recording.tags.map((tag) => tag.name) : [],
    }));
  } catch (error) {
    console.warn(`Failed to search tracks by tag ${tag}:`, error.message);
    return [];
  }
}

/**
 * Helper function for general MusicBrainz search
 * @param   {string|object} query - Search query
 * @param   {number} limit - Maximum number of tracks to return
 * @returns {Promise<Array>} - Array of track objects
 */
async function searchMusicBrainzTracks(query, limit = 20) {
  try {
    let tracks = [];

    // handle different query types
    if (typeof query === "string") {
      // string param - search by artist
      tracks = await searchTracksByArtist(query, limit);
    } else if (query && typeof query === "object") {
      // object param
      if (query.artists && query.artists.length > 0) {
        // search by multiple artists
        for (const artist of query.artists) {
          const artistTracks = await searchTracksByArtist(
            artist,
            Math.ceil(limit / query.artists.length)
          ); // distribute limit evenly
          tracks.push(...artistTracks);
        }
      }

      if (query.tags && query.tags.length > 0 && tracks.length < limit) {
        // search by tags if need more tracks
        for (const tag of query.tags) {
          const tagTracks = await searchTracksByTag(
            tag,
            Math.ceil((limit - tracks.length) / 2)
          ); // distribute remaining limit
          tracks.push(...tagTracks);
        }
      }

      // if specific title/artist provided, prioritise exact search
      if (query.title && query.artist) {
        const exactTracks = await searchTracksByArtist(query.artist, 5);
        // prioritise exact title matches
        const matchingTracks = exactTracks.filter((track) =>
          track.title.toLowerCase().includes(query.title.toLowerCase())
        );
        tracks.unshift(...matchingTracks); // add to beginning as higher priority
      }
    }

    // remove duplicates and limit results
    const uniqueTracks = tracks.reduce((acc, track) => {
      const key = `${track.title}-${track.artist}`.toLowerCase();
      if (!acc.has(key)) {
        acc.set(key, track);
      }
      return acc;
    }, new Map());

    return Array.from(uniqueTracks.values()).slice(0, limit); // limit final results
  } catch (error) {
    console.error("MusicBrainz search failed:", error.message);
    return [];
  }
}

module.exports = {
  createMusicBrainzRequest,
  searchTracksByArtist,
  searchTracksByTag,
  searchMusicBrainzTracks,
};
