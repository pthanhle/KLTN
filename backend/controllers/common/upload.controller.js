import asyncHandler from 'express-async-handler';

/**
 * @desc    Upload multiple images to Cloudinary
 * @route   POST /api/v1/upload/images
 * @access  Private (Usually staff/admin)
 */
export const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('Vui lòng chọn ít nhất 1 ảnh để tải lên');
  }

  // req.files is populated by multer-storage-cloudinary
  // Each file has a 'path' property which is the Cloudinary secure URL
  const uploadedUrls = req.files.map(file => file.path);

  res.status(200).json({
    success: true,
    data: uploadedUrls,
    message: 'Tải ảnh lên thành công'
  });
});

/**
 * @desc    Upload single image to Cloudinary
 * @route   POST /api/v1/upload/image
 * @access  Private (Usually staff/admin)
 */
export const uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Vui lòng chọn ảnh để tải lên');
  }

  res.status(200).json({
    success: true,
    url: req.file.path,
    message: 'Tải ảnh lên thành công'
  });
});
