'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        {
            id: 'description',
            label: 'Description',
            content: product.description,
        },
        {
            id: 'specifications',
            label: 'Specifications',
            content: product.specifications || (
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                        <div key={key} className="border-b pb-2">
                            <span className="font-medium text-gray-600">{key}:</span>{' '}
                            <span className="text-gray-800">{value}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 'reviews',
            label: `Reviews (${product.reviews || 0})`,
            content: product.reviewsData ? (
                <div className="space-y-4">
                    {product.reviewsData.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                            <div className="flex items-center gap-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <h4 className="font-medium">{review.title}</h4>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                            <p className="text-gray-400 text-xs mt-2">
                                - {review.author}, {review.date}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews yet. Be the first to review this product!</p>
            ),
        },
    ];

    return (
        <div className="mt-8">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="py-6">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}