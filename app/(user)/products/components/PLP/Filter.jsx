'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'beauty', name: 'Beauty' },
];

const ratings = [
    { id: '4', name: '4 Stars & Up' },
    { id: '3', name: '3 Stars & Up' },
    { id: '2', name: '2 Stars & Up' },
    { id: '1', name: '1 Star & Up' },
];

export default function Filter() {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleRatingChange = (ratingId) => {
        setSelectedRatings(prev =>
            prev.includes(ratingId)
                ? prev.filter(id => id !== ratingId)
                : [...prev, ratingId]
        );
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handleReset = () => {
        setPriceRange([0, 1000]);
        setSelectedCategories([]);
        setSelectedRatings([]);
    };

    return (
        <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>

            <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                            <Checkbox
                                id={`cat-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={() => handleCategoryChange(category.id)}
                                className="mr-2"
                            />
                            <label htmlFor={`cat-${category.id}`} className="text-sm">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-3">Customer Rating</h4>
                <div className="space-y-2">
                    {ratings.map((rating) => (
                        <div key={rating.id} className="flex items-center">
                            <Checkbox
                                id={`rating-${rating.id}`}
                                checked={selectedRatings.includes(rating.id)}
                                onCheckedChange={() => handleRatingChange(rating.id)}
                                className="mr-2"
                            />
                            <label htmlFor={`rating-${rating.id}`} className="text-sm">
                                {rating.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-full" onClick={() => console.log({
                priceRange,
                selectedCategories,
                selectedRatings
            })}>
                Apply Filters
            </Button>
        </div>
    );
}