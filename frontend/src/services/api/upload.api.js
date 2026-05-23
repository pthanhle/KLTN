import axiosClient from '../../utils/axiosClient';


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

  return response.data;
};


export const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosClient.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.url;
};
