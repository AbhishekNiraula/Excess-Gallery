require('dotenv').config();
const cloudinary = require('cloudinary').v2;
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';

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

    console.log(response.resources);
	const images = response.resources.map((image) => ({
		...image,
		secure_url: cloudinary.image(image.public_id, {
		  format: 'jpg',
		}),
	  }));

    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    res.status(500).json({ error: 'Failed to fetch images from Cloudinary', details: error.message });
  }
};
