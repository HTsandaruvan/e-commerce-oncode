'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || sortOptions[0].id);
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (sortId) => {
        setSelectedSort(sortId);
        const params = new URLSearchParams(searchParams);
        params.set('sort', sortId);
        params.set('page', '1'); // Reset to first page when changing sort
        router.replace(`?${params.toString()}`);
    };

    const selectedLabel = sortOptions.find(opt => opt.id === selectedSort)?.label;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    <ArrowDownUp className="mr-2 h-4 w-4" />
                    Sort by: {selectedLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-color1">
                {sortOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.id}
                        onClick={() => handleSortChange(option.id)}
                        className={selectedSort === option.id ? 'bg-primary' : ''}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}