import ProductGrid from './components/PLP/ProductGrid';
import Filter from './components/PLP/Filter';
import Sort from './components/PLP/Sort';
import Breadcrumb from '@/components/ui/common/Breadcrumb';

export const metadata = {
    title: 'E-Commerce | Products',
    description: 'Browse our product collection',
};

export default function ProductListing({ searchParams }) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold mb-6">All Products</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                    <Filter />
                </div>
                <div className="md:w-3/4">
                    <div className="flex justify-end mb-6">
                        <Sort />
                    </div>
                    <ProductGrid searchParams={searchParams} />
                </div>
            </div>
        </div>
    );
}