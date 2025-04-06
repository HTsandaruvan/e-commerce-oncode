'use client';

import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/ui/cart-item';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import EmptyCart from './EmptyCart';

export default function CartItems() {
    const { cart } = useCart();

    if (cart.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="space-y-4">
            <div className="space-y-6">
                {cart.items.map(item => (
                    <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
                ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
                <Link href="/products">
                    <Button variant="secondary">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Continue Shopping
                    </Button>
                </Link>

                <Link href="/checkout">
                    <Button variant="success">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}