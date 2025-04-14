export const generateCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
) => {
  const {
    width = 'auto',
    height = 'auto',
    quality = 90,
    format = 'auto'
  } = options;

  // Base Cloudinary URL with correct cloud name
  const baseUrl = 'https://res.cloudinary.com/dpw2txejq/image/upload';
  
  // Build transformation string
  const transformations = [
    width !== 'auto' ? `w_${width}` : '',
    height !== 'auto' ? `h_${height}` : '',
    'c_scale', // Scale mode instead of fill to maintain aspect ratio
    'q_auto:best', // Use best quality auto-optimization
    'f_auto', // Auto format selection
  ].filter(Boolean).join(',');

  // Return URL with transformations before version number
  return transformations 
    ? `${baseUrl}/${transformations}/v1744630729/${publicId}.png`
    : `${baseUrl}/v1744630729/${publicId}.png`;
};

// Predefined sizes for different use cases
export const IMAGE_SIZES = {
  blogCard: {
    width: 160,  // Smaller card size
    height: 160
  },
  blogHero: {
    width: 400, // Smaller hero/preview image
    height: 400
  },
  thumbnail: {
    width: 48,
    height: 48
  }
} as const; 