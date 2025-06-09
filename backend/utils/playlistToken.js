const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'next-track-jwt';

/**
 * Generates a JWT token for a playlist.
 * 
 * @param {string} playlistId - The ID of the playlist.
 * @return {string} - The generated JWT token.
 */
function generatePlaylistToken(playlist) {
  return jwt.sign(
    {
      playlist,
      type: 'playlist',
      iat: Math.floor(Date.now() / 1000),
    },
    JWT_SECRET,
    {
      expiresIn: '1h', // token expires in 1 hour
    }
  )
}

/**
 * Verifies a JWT token for a playlist.
 * 
 * @param {string} token - The JWT token to verify.
 * @return {string|null} - The playlist ID if the token is valid, otherwise null.
 */
function verifyPlaylistToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type === 'playlist') {
      return decoded.playlist;
    } else {
      throw new Error('Invalid token type');
    }
  } catch (error) {
    return null;
  }
}

module.exports = {
  generatePlaylistToken,
  verifyPlaylistToken,
};