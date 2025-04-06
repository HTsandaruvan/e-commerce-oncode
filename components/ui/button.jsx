'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot'; // Add this import
import { cn } from '@/lib/utils';

const Button = React.forwardRef(
    (
        {
            className,
            variant = 'default',
            size = 'default',
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-gray-950",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

const variants = {
    default: "bg-gray-900 text-white hover:bg-secondary dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
    success: "bg-success text-white hover:bg-secondary dark:bg-success dark:text-color1 dark:hover:bg-success/80",
    primary: "bg-primary text-white hover:bg-secondary dark:bg-primary dark:text-color1 dark:hover:bg-primary/80",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
    outline: "border border-gray-200 bg-transparent hover:bg-secondary dark:border-gray-800 dark:hover:bg-secondary",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
    move: "bg-muted hover:bg-color1 dark:hover:bg-color2 text-color1",

    link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
};

const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-2 rounded-md",
    lg: "h-11 px-8 rounded-md",
};

export { Button };