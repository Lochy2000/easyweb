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
    quality = 'auto',
    format = 'auto'
  } = options;

  // Base Cloudinary URL with correct cloud name
  const baseUrl = 'https://res.cloudinary.com/dpw2txejq/image/upload';
  
  // Build transformation string
  const transformations = [
    width !== 'auto' ? `w_${width}` : '',
    height !== 'auto' ? `h_${height}` : '',
    'c_scale', // Scale mode instead of fill to maintain aspect ratio
  ].filter(Boolean).join(',');

  // Return URL with transformations before version number
  return transformations 
    ? `${baseUrl}/${transformations}/v1744630729/${publicId}.png`
    : `${baseUrl}/v1744630729/${publicId}.png`;
};

// Predefined sizes for different use cases
export const IMAGE_SIZES = {
  blogCard: {
    width: 400,  // Square dimensions for cards
    height: 400
  },
  blogHero: {
    width: 600, // Square dimensions for hero images
    height: 600
  },
  thumbnail: {
    width: 100,
    height: 100
  }
} as const; 