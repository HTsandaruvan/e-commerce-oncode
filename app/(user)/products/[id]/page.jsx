"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import Gallery from "../components/PDP/Gallery";
import ProductInfo from "../components/PDP/Info";
import ProductTabs from "../components/PDP/Tabs";
import Breadcrumb from "@/components/ui/common/Breadcrumb";
import ProductCard from "@/components/ui/product-card";

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getProductById(params.id);
            if (!data) notFound();
            setProduct(data);

            // Fetch related products from same category
            const { products } = await getProducts({ limit: 4 });
            setRelatedProducts(products.filter(p => p.category === data.category && p.id !== data.id));
        }
        fetchData();
    }, [params.id]);

    if (!product) return <div className="container mx-auto px-4 py-8">Loading...</div>;

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: product.name, href: `/products/${params.id}` },
    ];
    const discountPercentage = product.oldprice
        ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100)
        : 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Gallery images={product.images}
                    discount={discountPercentage}
                    category={product.category} />
                <ProductInfo product={product} />
            </div>

            <ProductTabs product={product} />

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}