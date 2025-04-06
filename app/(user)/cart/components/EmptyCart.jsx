import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function EmptyCart() {
    return (
        <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start shopping to add items to your cart</p>
            <Link href="/products" className="mt-6 inline-block">
                <Button>
                    Browse Products
                </Button>
            </Link>
        </div>
    );
}