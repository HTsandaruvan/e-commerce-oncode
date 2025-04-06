'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Heart, Share2, GitCompare, ShoppingCart, Clock, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]
        });
    };

    const discountPercentage = product.oldprice
        ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <h1 className="text-4xl font-bold">{product.name}</h1>

            </div>

            <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-star/60' : 'text-secondary'}`}
                    />
                ))}
                <div className='border border-secondary'>
                    <span className="text-sm text-accent p-1">{product.rate}</span>
                </div>

                <span className="text-sm text-accent">({product.reviews} reviews)</span>
                <span className='text-sm text-accent ml-4'>|</span>
                <span className="text-sm text-accent ml-4">SKU: {product.id}</span>
            </div>
            <p className="text-accent">{product.description}</p>


            <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-destructive">${product.price.toFixed(2)}</div>
                {product.oldprice && (
                    <>
                        <div className="text-xl text-gray-500 line-through">${product.oldprice.toFixed(2)}</div>

                    </>
                )}
            </div>

            {/* Special Offer Timer */}
            <div className="flex items-center gap-2 bg-star/20 p-4 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">
                    <span className='text-destructive font-bold'> Special Offer:</span> Ends in <span className="font-bold">23:59:59</span ><span className='mx-2 '>Remains until the end of the offer.</span>
                </span>
            </div>


            <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border rounded-md">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-1 text-lg hover:bg-gray-100 transition-colors"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 border-x">{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="px-3 py-1 text-lg hover:bg-gray-100 transition-colors"
                    >
                        +
                    </button>
                </div>

                <Button variant="success" onClick={handleAddToCart} className="flex-1 gap-2 font-semibold">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </Button>
                <Button variant="secondary" className="flex-1 gap-2 font-semibold ">
                    Buy Now
                </Button>
            </div>

            {/* Payment and Warranty Info */}
            <div className="pt-6 space-y-1">
                <div className="flex items-center gap-2 border p-3">
                    <Truck className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 border p-3">
                    <ShieldCheck className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">2-year warranty</span>
                </div>
                <div className="flex items-center gap-2 border p-3">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">
                        Payment options:
                        <span className="ml-1 font-medium">Pay on delivery</span>,
                        <span className="font-medium">Card payment</span>,
                        <span className="font-medium">Google Pay</span>
                    </span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                    Get 5% discount when paying online!
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-10 pt-6">
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex items-center gap-2 text-gray-400 hover:text-destructive transition-colors"
                >
                    <Heart className={`w-6 h-6 border border-secondary p-1 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
                    Add to wishlist
                </button>
                <button className="flex items-center gap-2 text-sm text-accent hover:text-color2">
                    <Share2 className="w-6 h-6 border border-secondary p-1 " />
                    Share
                </button>
                <button className="flex items-center gap-2 text-sm text-accent hover:text-color2">
                    <GitCompare className="w-6 h-6 border border-secondary p-1" />
                    Compare
                </button>

            </div>
        </div>
    );
}