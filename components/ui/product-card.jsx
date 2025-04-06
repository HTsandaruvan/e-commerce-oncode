import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { Button } from './button';
import ClientImage from '@/lib/clientImage';

export default function ProductCard({ product }) {
    const discountPercent = product.oldprice > 0
        ? Math.round(100 - (product.price / product.oldprice) * 100)
        : 0;

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:border-primary transition-shadow duration-300 border border-gray-100 relative overflow-hidden">
            {/* Discount Badge */}
            {discountPercent > 0 && (
                <div className="absolute top-0 right-0 bg-primary text-white text-lg font-semibold px-2 py-3 rounded-bl-xl rounded-tr-lg z-10 flex flex-col items-center">
                    <span>{discountPercent}%</span>
                    <span>OFF</span>
                </div>
            )}

            {/* Image */}
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square w-full">
                    <ClientImage
                        src={product.images[0]}
                        alt={product.name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Ratings */}
                <span className="mr-auto text-sm text-gray-600 mb-2">{product.sold}+ sold</span>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < product.rating ? 'text-star fill-star' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm">|</span>
                    <span>{product.rate}</span>
                </div>

                {/* Price & Favorites */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                        {product.oldprice > 0 && (
                            <span className="text-destructive line-through text-sm">
                                ${product.oldprice.toFixed(2)}
                            </span>
                        )}
                        <button className="p-1 hover:text-destructive transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button
                <Button className="w-full mt-2" variant="outline">
                    Add to Cart
                </Button> */}
            </div>
        </div>
    );
}