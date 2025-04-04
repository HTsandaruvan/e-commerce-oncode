'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownUp } from 'lucide-react';

const sortOptions = [
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'name-asc', label: 'Name: A to Z' },
    { id: 'name-desc', label: 'Name: Z to A' },
    { id: 'rating-desc', label: 'Top Rated' },
    { id: 'newest', label: 'Newest Arrivals' },
];

export default function Sort() {
    const [selectedSort, setSelectedSort] = useState(sortOptions[0].id);
    const [isOpen, setIsOpen] = useState(false);

    const selectedLabel = sortOptions.find(opt => opt.id === selectedSort)?.label;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    <ArrowDownUp className="mr-2 h-4 w-4" />
                    Sort by: {selectedLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {sortOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.id}
                        onClick={() => setSelectedSort(option.id)}
                        className={selectedSort === option.id ? 'bg-gray-100' : ''}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}