"use client";

import Image from "next/image";

export default function ClientImage({ src, alt, className, sizes, priority }) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover rounded-t-xl transition-opacity opacity-0 duration-300 ${className}`}
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            sizes={sizes}
            priority={priority}
        />
    );
}