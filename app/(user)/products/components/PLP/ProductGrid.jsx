import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ui/product-card';
import Pagination from '@/components/ui/pagination';

export default async function ProductGrid({ searchParams }) {
    const currentPage = Number(searchParams?.page) || 1;
    const { products, totalPages } = await getProducts({
        page: currentPage,
        limit: 12
    });

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
        </div>
    );
}