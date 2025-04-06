'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Pagination({ currentPage, totalPages }) {
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
        const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

        if (currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }

    const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="sm"
                asChild
                disabled={currentPage === 1}
            >
                <Link href={`?page=${currentPage - 1}`}>
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            </Button>

            {pages.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? 'move' : 'outline'}
                    size="sm"
                    asChild
                >
                    <Link href={`?page=${page}`}>
                        {page}
                    </Link>
                </Button>
            ))}

            <Button
                variant="outline"
                size="sm"
                asChild
                disabled={currentPage === totalPages}
            >
                <Link href={`?page=${currentPage + 1}`}>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
}