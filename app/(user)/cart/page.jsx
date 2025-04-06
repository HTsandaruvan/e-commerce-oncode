import { Metadata } from 'next';
import CartItems from './components/CartItems';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import Breadcrumb from '@/components/ui/common/Breadcrumb';
import HeaderFilter from './components/HeaderFilter';

export const metadata = {
    title: 'E-Commerce | Cart',
    description: 'Your shopping cart',
};

export default function CartPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Cart', href: '/cart' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
            <HeaderFilter />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CartItems />
                </div>
                <div className="lg:col-span-1">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}