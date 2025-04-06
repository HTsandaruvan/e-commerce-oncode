'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const categories = [
    { id: 'smartphones', name: 'Smart Phones' },
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

const brandMap = {
    smartphones: ['Apple', 'Samsung', 'Sony', 'Huawei'],
    clothing: ['Nike', 'Adidas', 'Puma'],
    books: ['Penguin', 'HarperCollins'],
    home: ['IKEA', 'Philips'],
    beauty: ['L\'Oréal', 'Nivea'],
};


export default function Filter() {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };
    const handleBrandChange = (brandName) => {
        setSelectedBrands(prev =>
            prev.includes(brandName)
                ? prev.filter(name => name !== brandName)
                : [...prev, brandName]
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
        setPriceRange([0, 10000]);
        setSelectedCategories([]);
        setSelectedRatings([]);
    };
    const availableBrands = selectedCategories.flatMap(cat => brandMap[cat] || []);
    const uniqueBrands = [...new Set(availableBrands)];

    return (
        <div className="space-y-6 p-4 bg-color1 rounded-lg">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg"></h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>

            <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                            const min = Math.max(0, Number(e.target.value));
                            setPriceRange([min, priceRange[1]]);
                        }}
                        className="w-full rounded border px-2 py-1"
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                            const max = Math.min(10000, Number(e.target.value));
                            setPriceRange([priceRange[0], max]);
                        }}
                        className="w-full rounded border px-2 py-1"
                        placeholder="Max"
                    />
                </div>
                <Slider
                    min={0}
                    max={100000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                />



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
            {uniqueBrands.length > 0 && (
                <div>
                    <h4 className="font-medium mb-3">Brands</h4>
                    <div className="space-y-2">
                        {uniqueBrands.map((brand) => (
                            <div key={brand} className="flex items-center">
                                <Checkbox
                                    id={`brand-${brand}`}
                                    checked={selectedBrands.includes(brand)}
                                    onCheckedChange={() => handleBrandChange(brand)}
                                    className="mr-2"
                                />
                                <label htmlFor={`brand-${brand}`} className="text-sm">
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                selectedBrands,
                selectedRatings
            })}>
                Apply Filters
            </Button>
        </div>
    );
}