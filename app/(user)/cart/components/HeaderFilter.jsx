
'use client'
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeaderFilter = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">



            {/* Search Bar - Right Side */}
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="w-full md:w-auto">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="mint"
                            className="w-full md:w-[240px] justify-between text-left font-normal bg-secondary hover:bg-secondary/60"
                        >
                            {date ? (
                                date.toLocaleDateString()
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="h-4 w-4" />

                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>)
}

export default HeaderFilter