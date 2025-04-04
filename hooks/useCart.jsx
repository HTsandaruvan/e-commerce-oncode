'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({
        items: [],
        total: 0
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addItem = (item) => {
        setCart(prev => {
            // Check if item already exists in cart
            const existingItem = prev.items.find(i =>
                i.id === item.id &&
                (!i.size || i.size === item.size) &&
                (!i.color || i.color === item.color)
            );

            let updatedItems;
            if (existingItem) {
                // Update quantity if item exists
                updatedItems = prev.items.map(i =>
                    i.id === existingItem.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                // Add new item to cart
                updatedItems = [...prev.items, item];
            }

            // Calculate new total
            const total = updatedItems.reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
            );

            return { items: updatedItems, total };
        });
    };

    const removeItem = (itemId) => {
        setCart(prev => {
            const updatedItems = prev.items.filter(i => i.id !== itemId);
            const total = updatedItems.reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
            );
            return { items: updatedItems, total };
        });
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }

        setCart(prev => {
            const updatedItems = prev.items.map(i =>
                i.id === itemId ? { ...i, quantity } : i
            );
            const total = updatedItems.reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
            );
            return { items: updatedItems, total };
        });
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                updateQuantity,
                clearCart
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