'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative bg-neutral-900 overflow-hidden">
            {/* Background Pattern / Gradient */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter blur-[2px] transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/40 to-neutral-900"></div>

            <div className="container mx-auto px-4 pt-32 pb-24 relative z-10 text-center">

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up">
                    Verified Rooms & PGs <br className="hidden md:block" />
                    <span className="text-indigo-400">in Kochi</span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 font-medium">
                    Sourced and managed by a local broker you can trust.
                </p>

                {/* Actions */}
                <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-4">
                    <Link
                        href="/properties"
                        className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                    >
                        View Available Properties
                    </Link>
                </div>
            </div>
        </section>
    );
}
