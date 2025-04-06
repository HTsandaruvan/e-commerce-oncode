'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ images, discount, category }) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="relative">
            {/* Badges - Top Left Corner */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {discount > 0 && (
                    <div className="bg-destructive text-white  font-bold px-7 py-1 rounded-full">
                        {discount}%
                    </div>
                )}
                <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
                    {category}
                </div>
            </div>

            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4">
                <Image
                    src={images[currentImage]}
                    alt="Product image"
                    fill
                    className="object-cover"
                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`relative aspect-square rounded-md overflow-hidden border-2 ${currentImage === index ? 'border-primary' : 'border-transparent'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}