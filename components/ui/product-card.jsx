import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from './button';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square w-full">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button size="sm" className="ml-2">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}