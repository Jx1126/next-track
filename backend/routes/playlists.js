const express = require('express');
const router = express.Router();
const { createMusicBrainzRequest } = require('../utils/musicbrainz'); // import the helper function to create MusicBrainz requests
const { generatePlaylistToken, verifyPlaylistToken } = require('../utils/playlistToken');

// /**
//  * @route   GET /api/music/playlist
//  * @desc    Get all playlists
//  * @returns {object} - JSON object containing an array of all playlists
//  */
// router.get('/', (req, res) => {
//   try {
//     // convert the map of playlists to an array of playlist objects
//     const all_playlists = Array.from(playlists.values()).map(playlist => ({
//       id: playlist.id,
//       name: playlist.name,
//       description: playlist.description,
//       added_tracks_count: playlist.tracks.length,
//       created_at: playlist.created_at,
//       last_updated: playlist.last_updated,
//     }));

//     // respond with the total number of playlists and the list of playlists
//     res.json({
//       total_playlists: all_playlists.length,
//       playlists: all_playlists,
//     });

//   } catch (error) {
//     console.error(`Error in /playlist: ${error.message}`);
//     res.status(500).json({
//       error: 'Failed to retrieve playlists',
//       message: error.message
//     });
//   }
// });

/**
 * @route   POST /api/music/playlist/create
 * @desc    Create a new playlist
 * @body    playlist_name (required) - Name of the new playlist
 * @body    playlist_description (optional) - Description of the new playlist
 * @returns {object} - JSON object containing the created playlist details
 */
router.post('/create', (req, res) => {
  try {
    const { playlist_name, playlist_description } = req.body;

    // validation: playlist name is required
    if (!playlist_name) {
      return res.status(400).json({
        error: 'Playlist name required',
        message: 'Please provide a name for the playlist'
      });
    }

    // create a unique id for the new playlist
    const playlist_id = Date.now().toString() + Math.random().toString(36).substring(2, 10);
    const playlist = {
      id: playlist_id,
      name: playlist_name,
      description: playlist_description || '',
      tracks: [],
      added_tracks_count: 0,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    }

    const playlist_token = generatePlaylistToken(playlist); // generate a token for the playlist

    // respond with the created playlist details
    res.status(201).json({
      message: 'Playlist created successfully',
      playlist_token,
      playlist
    });

  } catch (error) {
    console.error(`Error in /playlist/create: ${error.message}`);
    res.status(500).json({
      error: 'Failed to create playlist',
      message: error.message
    });
  }
});

/**
 * @route   POST /api/music/playlist/get
 * @desc    Get details of a specific playlist by its token
 * @body    playlist_token (required) - Token of the playlist
 * @returns {object} - JSON object containing the playlist details
 */
router.post('/get', (req, res) => {
  try {
    const { playlist_token } = req.body;

    if (!playlist_token) {
      return res.status(400).json({
        error: 'Invalid playlist token',
        message: 'Playlist token is required to retrieve playlist details'
      });
    }

    // validation: check if the playlist exists
    const playlist = verifyPlaylistToken(playlist_token);
    if (!playlist) {
      return res.status(404).json({
        error: 'Playlist not found',
        message: 'No playlist found with the provided token'
      });
    }

    res.json({ playlist }); // respond with the playlist details

  } catch (error) {
    console.error(`Error in /playlist/get ${error.message}`);
    res.status(500).json({
      error: 'Failed to retrieve playlist',
      message: error.message
    });
  }
});

/**
 * @route   POST /api/music/playlist/add
 * @desc    Add a track to a specific playlist by its token
 * @body    playlist_token (required) - Token of the playlist
 * @body    track_id (required) - ID of the track to be added to the playlist
 * @returns {object} - JSON object containing the updated playlist details
 */
router.post('/add', async (req, res) => {
  try {
    const { playlist_token, track_id } = req.body;

    if (!playlist_token || !track_id) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Both playlist token and track ID are required to add a track to the playlist'
      });
    }

    const playlist = verifyPlaylistToken(playlist_token); // verify the playlist token
    // validation: check if the playlist exists
    if (!playlist) {
      return res.status(404).json({
        error: 'Playlist not found',
        message: `No playlist found with the provided token`
      });
    }

    // validation: check if the track is already in the playlist
    const already_in_playlist = playlist.tracks.find(track => track.id === track_id);
    if (already_in_playlist) {
      return res.status(400).json({
        error: 'Track already exists in playlist',
        message: `Track with ID ${track_id} is already in the playlist`
      });
    }

    // fetch track details from MusicBrainz API
    const data = await createMusicBrainzRequest(`recording/${track_id}`, {
      inc: 'artists+releases+tags',
    });

    // construct the track data to be added to the playlist
    const track_data = {
      id: data.id,
      title: data.title,
      artist: data['artist-credit']?.[0]?.name || 'Unknown Artist',
      artist_id: data['artist-credit']?.[0]?.artist?.id,
      length: data.length ? Math.round(data.length / 1000) : 0, // length in seconds
      added_at : new Date().toISOString(),
      tags: data.tags?.map(tag => tag.name) || [],
    };

    playlist.tracks.push(track_data); // add the track to the playlist
    playlist.added_tracks_count = playlist.tracks.length; // update the count of added tracks
    playlist.last_updated = new Date().toISOString(); // update the last updated timestamp

    const updated_token = generatePlaylistToken(playlist); // generate a new token for the updated playlist

    // respond with the updated playlist details
    res.status(201).json({
      message: 'Track added to playlist successfully',
      playlist_token: updated_token,
      track_data,
      playlist: {
        id: playlist.id,
        name: playlist.name,
        tracks_count: playlist.tracks.length,
        last_updated: playlist.last_updated,
      },
    });

  } catch (error) {
    console.error(`Error in /playlist/add ${error.message}`);
    res.status(500).json({
      error: 'Failed to add tracks to playlist',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /api/music/playlist/:id/remove/:track_id
 * @desc    Remove a track from a specific playlist by token
 * @body    playlist_token (required) - Token of the playlist
 * @body    track_id (required) - ID of the track to be removed from the playlist
 * @returns {object} - JSON object containing the removed track and updated playlist details
 */
router.delete('/remove', (req, res) => {
  try {
    const { playlist_token, track_id } = req.body;

    // validation: check if the playlist exists
    if (!playlist_token || !track_id) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Both playlist token and track ID are required to remove a track from the playlist'
      });
    }

    // validation: verify the playlist token
    const playlist = verifyPlaylistToken(playlist_token); // verify the playlist token
    if (!playlist) {
      return res.status(404).json({
        error: 'Playlist not found',
        message: `No playlist found with the provided token`
      });
    }

    // validation: check if the track exists in the playlist
    const track_index = playlist.tracks.findIndex(track => track.id === track_id);
    if (track_index === -1) {
      return res.status(404).json({
        error: 'Track not found in playlist',
        message: `No track found with ID: ${track_id} in the playlist.`
      });
    }

    const removed_track = playlist.tracks.splice(track_index, 1)[0]; // remove the track from the playlist
    playlist.last_updated = new Date().toISOString(); // update the last updated timestamp

    const updated_token = generatePlaylistToken(playlist); // generate a new token for the updated playlist

    // respond with success message and updated playlist details
    res.status(200).json({
      message: 'Track removed from playlist successfully',
      playlist_token: updated_token,
      removed_track,
      playlist: {
        id: playlist.id,
        name: playlist.name,
        tracks_count: playlist.tracks.length,
        last_updated: playlist.last_updated,
      },
    });

  } catch (error) {
    console.error(`Error in /playlist/remove/ ${error.message}`);
    res.status(500).json({
      error: 'Failed to remove track from playlist',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /api/music/playlist/delete
 * @desc    Delete a specific playlist by discarding its token
 * @body    playlist_token (required) - Token of the playlist to be deleted
 * @returns {object} - JSON object containing a success message and details of the deleted playlist
 */
router.delete('/delete', (req, res) => {
  try {
    const { playlist_token } = req.body;

    if (!playlist_token) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Playlist token is required to delete a playlist'
      }); 
    }
    
    // validation: check if the playlist exists
    const selected_playlist = verifyPlaylistToken(playlist_token); // verify the playlist token
    if (!selected_playlist) {
      return res.status(404).json({
        error: 'Playlist not found',
        message: `No playlist found with the provided token`
      });
    }

    // respond with success message
    res.status(200).json({
      message: 'Playlist deleted successfully',
      deleted_playlist: {
        id: selected_playlist.id,
        name: selected_playlist.name,
      }
    });

  } catch (error) {
    console.error(`Error in /playlist/delete: ${error.message}`);
    res.status(500).json({
      error: 'Failed to delete playlist',
      message: error.message
    });
  }
});

module.exports = router;