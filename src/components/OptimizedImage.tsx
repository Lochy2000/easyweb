import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * OptimizedImage component for better SEO and performance
 * - Adds width and height attributes to prevent layout shifts
 * - Supports lazy loading with a placeholder
 * - Adds fetchpriority attribute for important images
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fetchpriority = 'auto',
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // If priority is true, set fetchpriority to high and disable lazy loading
  const imgLoading = priority ? 'eager' : 'lazy';
  const imgFetchPriority = priority ? 'high' : fetchpriority;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={imgLoading}
        fetchpriority={imgFetchPriority}
        onLoad={() => setIsLoading(false)}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        {...props}
      />
    </div>
  );
}; 