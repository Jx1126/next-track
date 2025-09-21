const youtube_search = require("youtube-search-api");

/**
 * Help function to generate a YouTube link for a given track and artist.
 *
 * @param {string} trackName  - The name of the track.
 * @param {string} artistName - The name of the artist.
 * @return {Promise<string>}  - A promise that resolves to the YouTube link for the track.
 */
async function generateYoutubeLink(trackName, artistName) {
  try {
    // construct the search query using track name and artist name
    const search_query = `${trackName} ${artistName}`;
    const search_results = await youtube_search.GetListByKeyword(
      search_query,
      false,
      1
    ); // search for the track on YouTube

    // validation: the search results must contain at least one item
    if (!search_results || search_results.length === 0) {
      throw new Error(
        "No YouTube results found for the given track and artist."
      );
    }

    const first_result = search_results.items[0]; // get the first result from the search results
    const video_id = first_result.id; // extract the youtube video id from the first result
    const youtube_link = `https://www.youtube.com/watch?v=${video_id}`; // construct the YouTube link using the video id
    return youtube_link;
  } catch (error) {
    throw new Error(`Failed to generate YouTube link: ${error.message}`);
  }
}

module.exports = { generateYoutubeLink };
