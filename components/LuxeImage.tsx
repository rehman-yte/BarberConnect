
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { imageService } from '../services/imageService';

interface LuxeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'salon' | 'cut' | 'shave' | 'portrait';
  priority?: boolean;
}

/**
 * SELF-HEALING IMAGE COMPONENT
 * Implements silent retry, shimmer effects, and automatic fallback resolution.
 */
const LuxeImage: React.FC<LuxeImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackType = 'salon',
  priority = false 
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // If src is clearly invalid or empty, jump to error
    if (!src) {
      setStatus('error');
      setCurrentSrc(imageService.getFallback(fallbackType));
      return;
    }
    
    setCurrentSrc(src);
    setStatus('loading');
    setRetryCount(0);
  }, [src, fallbackType]);

  const handleError = () => {
    if (retryCount < 1) { // Faster fallback trigger
      // Silent internal retry after a small delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Avoid cache issues on retry
        setCurrentSrc(prev => prev.includes('?') ? `${prev}&retry=1` : `${prev}?retry=1`);
      }, 500);
    } else {
      // Final Self-Heal: Resolve to Luxury Fallback
      console.warn(`[Self-Healing] Resolving broken image to ${fallbackType} fallback: ${src}`);
      setCurrentSrc(imageService.getFallback(fallbackType));
      setStatus('error'); 
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {status === 'loading' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 skeleton z-10"
          />
        )}
      </AnimatePresence>

      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setStatus('loaded')}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          status === 'loaded' || status === 'error' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {status === 'error' && (
        <div className="absolute top-2 right-2 p-1 bg-black/20 backdrop-blur-sm rounded-full z-20">
           <ImageIcon className="w-3 h-3 text-white/60" />
        </div>
      )}
    </div>
  );
};

export default LuxeImage;
