'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={images[selectedImage]}
                    alt="Product image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'
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