const axios = require('axios');


module.exports = async (req, res) => {
  const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

  let res;
  try {
	res = (await cloudinary.v2.search
		.expression('resource_type:image')
		.sort_by('public_id', 'desc')
		.max_results(150)
		.execute());
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
		}
	}