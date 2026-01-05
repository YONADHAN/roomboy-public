import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
    return (
        <section className="py-24 bg-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
                    Looking for a place to stay?
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10">
                    Find verified options curated by your trusted local broker.
                </p>
                <Link
                    href="/properties"
                    className="inline-flex items-center px-10 py-5 bg-indigo-600 text-white text-lg font-bold rounded-full hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    Browse Available Properties <ArrowRight className="ml-2" />
                </Link>
            </div>
        </section>
    );
}
