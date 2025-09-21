const express = require("express");
const router = express.Router();
const { createMusicBrainzRequest } = require("../utils/musicbrainz"); // import the helper function to create MusicBrainz requests

/**
 * @route   POST /api/music/playlist/create
 * @desc    Create a new playlist
 * @body    playlist_name (required) - Name of the new playlist
 * @body    playlist_description (optional) - Description of the new playlist
 * @returns {object} - JSON object containing the created playlist details
 */
router.post("/create", (req, res) => {
  try {
    const { playlist_name, playlist_description } = req.body;

    // validation: playlist name is required
    if (!playlist_name) {
      return res.status(400).json({
        error: "Playlist name required",
        message: "Please provide a name for the playlist",
      });
    }

    // create a unique id for the new playlist
    const playlist_id =
      Date.now().toString() + Math.random().toString(36).substring(2, 10);
    const playlist = {
      id: playlist_id,
      name: playlist_name,
      description: playlist_description || "",
      tracks: [],
      added_tracks_count: 0,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };

    // respond with the created playlist details
    res.status(201).json({
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error(`Error in /playlist/create: ${error.message}`);
    res.status(500).json({
      error: "Failed to create playlist",
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/music/playlist/get
 * @desc    Get details of a specific playlist
 * @body    playlist (required) - Current playlist object
 * @returns {object} - JSON object containing the playlist details
 */
router.post("/get", (req, res) => {
  try {
    const { playlist } = req.body;

    if (!playlist) {
      return res.status(400).json({
        error: "Invalid playlist",
        message: "Playlist is required to retrieve playlist details",
      });
    }
    res.json({ playlist }); // respond with the playlist details
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve playlist",
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/music/playlist/add
 * @desc    Add a track to a specific playlist
 * @body    playlist (required) - Current playlist object
 * @body    track_id (required) - ID of the track to be added to the playlist
 * @returns {object} - JSON object containing the updated playlist details
 */
router.post("/add", async (req, res) => {
  try {
    const { playlist, track_id } = req.body;

    if (!playlist || !track_id) {
      return res.status(400).json({
        error: "Invalid request",
        message:
          "Both playlist object and track ID are required to add a track to the playlist",
      });
    }

    // validation: check if the track is already in the playlist
    const already_in_playlist = playlist.tracks.find(
      (track) => track.id === track_id
    );
    if (already_in_playlist) {
      return res.status(400).json({
        error: "Track already exists in playlist",
        message: `Track with ID ${track_id} is already in the playlist`,
      });
    }

    // fetch track details from MusicBrainz API
    const data = await createMusicBrainzRequest(`recording/${track_id}`, {
      inc: "artists+releases+tags",
    });

    // construct the track data to be added to the playlist
    const track_data = {
      id: data.id,
      title: data.title,
      artist: data["artist-credit"]?.[0]?.name || "Unknown Artist",
      artist_id: data["artist-credit"]?.[0]?.artist?.id,
      length: data.length ? Math.round(data.length / 1000) : 0, // length in seconds
      release_date:
        data.releases && data.releases[0] ? data.releases[0].date : null, // add release date
      added_at: new Date().toISOString(),
      tags: data.tags?.map((tag) => tag.name) || [],
    };

    const updated_playlist = {
      ...playlist,
      tracks: [...playlist.tracks, track_data],
      last_updated: new Date().toISOString(),
    };

    // respond with the updated playlist details
    res.status(201).json({
      message: "Track added to playlist successfully",
      playlist: updated_playlist,
      added_track: track_data,
    });
  } catch (error) {
    console.error(`Error in /playlist/add ${error.message}`);
    res.status(500).json({
      error: "Failed to add tracks to playlist",
      message: error.message,
    });
  }
});

/**
 * @route   DELETE /api/music/playlist/:id/remove/:track_id
 * @desc    Remove a track from a specific playlist
 * @body    playlist (required) - Current playlist object
 * @body    track_id (required) - ID of the track to be removed
 * @returns {object} - JSON object containing the removed track and updated playlist details
 */
router.delete("/remove", (req, res) => {
  try {
    const { playlist, track_id } = req.body;

    // validation: check if the playlist exists
    if (!playlist || !track_id) {
      return res.status(400).json({
        error: "Invalid request",
        message:
          "Both playlist and track ID are required to remove a track from the playlist",
      });
    }

    // validation: check if the track exists in the playlist
    const track_index = playlist.tracks.findIndex(
      (track) => track.id === track_id
    );
    if (track_index === -1) {
      return res.status(404).json({
        error: "Track not found in playlist",
        message: `No track found with ID: ${track_id} in the playlist.`,
      });
    }

    const removed_track = playlist.tracks[track_index];
    const updated_tracks = playlist.tracks.filter(
      (track) => track.id !== track_id
    );

    const updated_playlist = {
      ...playlist,
      tracks: updated_tracks,
      last_updated: new Date().toISOString(),
    };

    // respond with success message and updated playlist details
    res.status(200).json({
      message: "Track removed from playlist successfully",
      playlist: updated_playlist,
      removed_track,
    });
  } catch (error) {
    console.error(`Error in /playlist/remove/ ${error.message}`);
    res.status(500).json({
      error: "Failed to remove track from playlist",
      message: error.message,
    });
  }
});

module.exports = router;
