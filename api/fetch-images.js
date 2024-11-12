const axios = require('axios');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

module.exports = async (req, res) => {

  try {
	const response = (await cloudinary.v2.search
		.expression('resource_type:image')
		.sort_by('public_id', 'desc')
		.max_results(150)
		.execute());

    res.status(200).json(response.resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
  }
};
