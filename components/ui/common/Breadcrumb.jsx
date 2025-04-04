// src/components/Breadcrumb.jsx

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {items.map((item, index) => (
                    <li key={item.href} className="inline-flex items-center">
                        {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
                        {index === items.length - 1 ? (
                            <span className="text-gray-500">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="text-blue-600 hover:underline">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
