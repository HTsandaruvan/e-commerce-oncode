"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import Gallery from "../components/PDP/Gallery";
import ProductInfo from "../components/PDP/Info";
import ProductTabs from "../components/PDP/Tabs";
import Breadcrumb from "@/components/ui/common/Breadcrumb";

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const data = await getProductById(params.id);
            if (!data) notFound();
            setProduct(data);
        }
        fetchProduct();
    }, [params.id]);

    if (!product) return <div>Loading...</div>;

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: product.name, href: `/products/${params.id}` },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Gallery images={product.images} />
                <ProductInfo product={product} />
            </div>

            <ProductTabs product={product} />
        </div>
    );
}
