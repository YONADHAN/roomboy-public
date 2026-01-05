'use client';

import Link from 'next/link';
import { useContact } from '@/context/ContactContext';

export function Header() {
    const { openContact } = useContact();

    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="font-bold text-xl tracking-tight text-neutral-900">
                    <Link href="/">Roomboy</Link>
                </div>
                <nav>
                    <ul className="flex items-center gap-6 text-sm font-medium text-neutral-600">
                        <li>
                            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/locations" className="hover:text-neutral-900 transition-colors">Locations</Link>
                        </li>
                        <li>
                            <button
                                onClick={openContact}
                                className="text-neutral-900 hover:text-indigo-600 font-semibold transition-colors"
                            >
                                Contact
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
