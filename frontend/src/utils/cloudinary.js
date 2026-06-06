/**
 * Injects Cloudinary transformation parameters into an existing Cloudinary URL.
 * Works only on URLs from res.cloudinary.com — passes other URLs through unchanged.
 *
 * @param {string} url   Raw Cloudinary URL as stored in DB
 * @param {object} opts  Transformation options
 * @param {string} [opts.quality='auto:best']   q_ value
 * @param {string} [opts.fetchFormat='auto']    f_ value (serve WebP/AVIF to browsers that support it)
 * @param {number} [opts.width]                 w_ value (c_limit keeps aspect ratio)
 * @returns {string}
 */
export const optimizeCloudinaryUrl = (url, { quality = 'auto:best', fetchFormat = 'auto', width } = {}) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    const transforms = [
        `q_${quality}`,
        `f_${fetchFormat}`,
        width ? `w_${width},c_limit` : null,
    ].filter(Boolean).join(',');
    return url.replace('/upload/', `/upload/${transforms}/`);
};
