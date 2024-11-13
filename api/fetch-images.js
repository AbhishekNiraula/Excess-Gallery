require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  try {
    const response = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('public_id', 'desc')
      .max_results(150)
      .execute();

	const images = result.resources.map((image) => ({
		...image,
		secure_url: cloudinary.image(image.secure_url, {
			transformation: [
				{fetch_format: 'jpg'}
			]
		}),
	}));
	console.log(images);

    res.status(200).json(images);
  	} catch (error) {
    	console.error('Error fetching images from Cloudinary:', error);
    	res.status(500).json({ error: 'Failed to fetch images from Cloudinary', details: error.message });
  	}
};
