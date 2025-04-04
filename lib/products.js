
export async function getProducts() {
    return [
        {
            id: "1",
            name: "Premium Headphones",
            price: 299.99,
            description: "High-quality noise-cancelling headphones with premium sound.",
            images: ["/images/products/headphone-1.jpeg", "/images/products/headphone-2.jpeg", "/images/products/headphone-3.jpeg"],
            rating: 4,
            reviews: 125,
            category: "electronics",
        },
        // More products...
    ];
}

export async function getProductById(id) {
    const products = await getProducts();
    return products.find((product) => product.id === id);
}
