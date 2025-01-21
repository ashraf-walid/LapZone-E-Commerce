import { useState, useEffect } from 'react';

export default function ImageGallery({ images, productName }) {
  const [displayImage, setDisplayImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (images?.length > 0) {
      setDisplayImage(images[0]);
    }
  }, [images]);

  return (
    <div className="flex gap-x-8 sticky top-24 self-start">
      {/* Thumbnails */}
      <div className="self-start">
        <div className="bg-white p-4 max-sm:p-2 rounded-xl shadow-sm border border-gray-100 space-y-3">
          {images?.map((imgUrl, i) => (
            <div
              key={i}
              className={`relative rounded-lg overflow-hidden ${
                displayImage === imgUrl ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={imgUrl}
                onClick={() => setDisplayImage(imgUrl)}
                className="w-16 h-16 max-sm:w-10 max-sm:h-10 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                alt={`${productName} thumbnail ${i + 1}`}
              />
              {displayImage === imgUrl && (
                <div className="absolute inset-0 bg-blue-500/10" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 self-start">
        <div 
          className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={displayImage}
            alt={productName}
            className={`w-full max-w-xl mx-auto rounded-lg transition-all duration-300 ${
              isZoomed ? 'scale-105 shadow-xl' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}
