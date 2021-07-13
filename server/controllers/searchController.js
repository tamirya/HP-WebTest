const axios = require("axios");
const _ = require('lodash');
/**
 * This method get the music albums from itunes
 * and returns the albums to client
 * @returns array
 */
exports.run = async function (req, res) {
  try {
    const response = await axios.get(
      `https://itunes.apple.com/search?entity=album&term=pink+floyd`
    );
    const albums = response.data.results;
    const filterdAlbums = _.uniqBy(albums,'collectionName');
    res.json(filterdAlbums);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};
