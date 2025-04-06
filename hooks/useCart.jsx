'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SHIPPING_METHODS = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
    { id: 'priority', name: 'Priority Shipping', price: 19.99, days: '1-2 business days' },
];

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({
        items: [],
        subtotal: 0,
        shippingMethod: SHIPPING_METHODS[0],
        shipping: SHIPPING_METHODS[0].price,
        tax: 0,
        total: 0
    });

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Find the saved shipping method or use default
            const savedShippingMethod = SHIPPING_METHODS.find(
                method => method.id === parsedCart.shippingMethod?.id
            ) || SHIPPING_METHODS[0];

            setCart({
                ...parsedCart,
                shippingMethod: savedShippingMethod,
                shipping: savedShippingMethod.price
            });
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotals = (items, shippingMethod = cart.shippingMethod) => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : shippingMethod.price; // Free shipping over $100
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;

        return {
            subtotal,
            shipping,
            tax,
            total,
            shippingMethod
        };
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.items.find(item =>
                item.id === product.id &&
                item.size === product.size &&
                item.color === product.color
            );

            let updatedItems;
            if (existingItem) {
                updatedItems = prev.items.map(item =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            } else {
                updatedItems = [...prev.items, { ...product, quantity: product.quantity || 1 }];
            }

            return {
                ...prev,
                ...calculateTotals(updatedItems, prev.shippingMethod),
                items: updatedItems
            };
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => {
            const updatedItems = prev.items.filter(item => item.id !== itemId);
            return {
                ...prev,
                ...calculateTotals(updatedItems, prev.shippingMethod),
                items: updatedItems
            };
        });
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) {
            removeFromCart(itemId);
            return;
        }

        setCart(prev => {
            const updatedItems = prev.items.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            );
            return {
                ...prev,
                ...calculateTotals(updatedItems, prev.shippingMethod),
                items: updatedItems
            };
        });
    };

    const updateShippingMethod = (methodId) => {
        const newMethod = SHIPPING_METHODS.find(method => method.id === methodId);
        if (!newMethod) return;

        setCart(prev => ({
            ...prev,
            ...calculateTotals(prev.items, newMethod)
        }));
    };

    const clearCart = () => {
        setCart({
            items: [],
            subtotal: 0,
            shippingMethod: SHIPPING_METHODS[0],
            shipping: SHIPPING_METHODS[0].price,
            tax: 0,
            total: 0
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                shippingMethods: SHIPPING_METHODS,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateShippingMethod,
                clearCart,
                cartCount: cart.items.reduce((count, item) => count + item.quantity, 0)
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}