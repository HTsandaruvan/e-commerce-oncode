'use client';

import Image from 'next/image';
import { Button } from './button';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex flex-col sm:flex-row gap-4 py-6 border-b">
            <div className="relative aspect-square w-full sm:w-24 rounded-md overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                {item.color && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        Color:
                        <span
                            className="w-4 h-4 rounded-full border inline-block"
                            style={{ backgroundColor: item.color }}
                        />
                    </div>
                )}

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-md">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-2">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}