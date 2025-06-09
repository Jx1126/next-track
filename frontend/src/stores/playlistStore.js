/**
 * Retrieve playlists from localStorage.
 * 
 * @returns {Array} An array of playlists, or an empty array if none exist.
 */
export function getPlaylists() {
  return JSON.parse(localStorage.getItem('playlists')) || [];
}

/**
 * Save playlists to localStorage.
 * 
 * @param {Array} playlists - An array of playlists to be saved.
 */
export function savePlaylists(playlists) {
  localStorage.setItem('playlists', JSON.stringify(playlists));
}

/**
 * Retrieve a playlist by its ID.
 * 
 * @param {string} id - The ID of the playlist to retrieve.
 * @return {Object|null} The playlist object if found, or null if not found.
 */
export function getPlaylistById(id) {
  const playlists = getPlaylists();
  return playlists.find(playlist => playlist.id === id);
}

/**
 * Update a playlist with new tracks.
 * 
 * @param {string} id - The ID of the playlist to update.
 * @param {Array} updatedTracks - An array of tracks to update the playlist with.
 */
export function updatePlaylist(id, updatedTracks) {
  const playlists = getPlaylists();
  const index = playlists.findIndex(playlist => playlist.id === id);

  if (index !== -1) {
    playlists[index].tracks = updatedTracks;
    playlists[index].added_tracks_count = updatedTracks.length;
    playlists[index].last_updated = new Date().toISOString();
    savePlaylists(playlists);
  }
}