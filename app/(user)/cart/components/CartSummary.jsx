'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, CheckCircle2, Info, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';


export default function CartSummary() {
    const { cart, shippingMethods, updateShippingMethod } = useCart();


    if (cart.items.length === 0) return null;

    const isFreeShipping = cart.subtotal > 100;
    const shippingCost = isFreeShipping ? 0 : cart.shippingMethod.price;
    const amountNeededForFreeShipping = Math.max(0, 100 - cart.subtotal);

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            {/* Header with filters */}


            {/* Rest of your CartSummary component remains the same */}
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${cart.tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                </div>
            </div>

            {/* Dedicated Shipping Calculation Card */}
            <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Shipping Calculation</h3>
                </div>

                {!isFreeShipping && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Free shipping on orders over $100</span>
                            <span className="text-sm font-medium">
                                ${amountNeededForFreeShipping.toFixed(2)} more needed
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-success h-2 rounded-full"
                                style={{ width: `${Math.min(100, (cart.subtotal / 100) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <RadioGroup
                        value={cart.shippingMethod.id}
                        onValueChange={updateShippingMethod}
                        className="space-y-3"
                    >
                        {shippingMethods.map(method => (
                            <div key={method.id} className="flex items-start gap-3">
                                <RadioGroupItem
                                    value={method.id}
                                    id={method.id}
                                    disabled={cart.subtotal > 100}
                                    className="mt-1"
                                />
                                <Label htmlFor={method.id} className="flex-1">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{method.name}</span>
                                        <span className={isFreeShipping ? 'text-green-600' : ''}>
                                            {isFreeShipping ? (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Free
                                                </span>
                                            ) : (
                                                `$${method.price.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Estimated delivery: {method.days}
                                    </div>
                                    {method.id === cart.shippingMethod.id && (
                                        <div className="text-xs text-blue-600 mt-1">
                                            Selected option
                                        </div>
                                    )}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {isFreeShipping ? (
                    <div className="mt-3 p-3 bg-green-50 rounded-md flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-green-800">
                                Free shipping applied!
                            </p>
                            <p className="text-xs text-green-700">
                                Your order qualifies for free standard shipping.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 p-3 bg-blue-50 rounded-md flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-800">
                                Shipping Cost: ${shippingCost.toFixed(2)}
                            </p>
                            <p className="text-xs text-blue-700">
                                Spend ${amountNeededForFreeShipping.toFixed(2)} more to get free shipping
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <Link href="/checkout" className="block mt-6">
                <Button variant="primary" className="w-full h-12 text-base">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
    );
}