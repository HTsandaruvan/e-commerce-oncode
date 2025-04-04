import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ui/product-card';

export default async function ProductGrid() {
    const products = await getProducts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}