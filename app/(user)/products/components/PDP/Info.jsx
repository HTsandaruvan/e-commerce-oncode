'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: ''
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border rounded-md">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-1 text-lg"
                    >
                        -
                    </button>
                    <span className="px-3 py-1">{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="px-3 py-1 text-lg"
                    >
                        +
                    </button>
                </div>

                <Button onClick={handleAddToCart} className="flex-1">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}