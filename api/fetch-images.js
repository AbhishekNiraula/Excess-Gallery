const axios = require('axios');

module.exports = async (req, res) => {
  const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`,
      {
        auth: {
          username: API_KEY,
          password: API_SECRET,
        },
      }
    );

    res.status(200).json(response.data.resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
  }
};
