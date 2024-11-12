const cloudinary = require('cloudinary').v2;

module.exports = async (req, res) => {

  try {
	const response = (await cloudinary.search
		.expression('resource_type:image')
		.sort_by('public_id', 'desc')
		.max_results(150)
		.execute());

		console.log(response.resources);

    res.status(200).json(response.resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
  }
};
