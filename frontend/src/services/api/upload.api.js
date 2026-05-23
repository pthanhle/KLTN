import axiosClient from '../../utils/axiosClient';

/**
 * Upload multiple images to Cloudinary
 * @param {File[]} files - Array of image files
 * @returns {Promise<string[]>} Array of Cloudinary URLs
 */
export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  const response = await axiosClient.post('/upload/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

/**
 * Upload single image to Cloudinary
 * @param {File} file - Image file
 * @returns {Promise<string>} Cloudinary URL
 */
export const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosClient.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url;
};
