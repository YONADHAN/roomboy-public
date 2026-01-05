'use client';

import Link from 'next/link';
import { useContact } from '@/context/ContactContext';
import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
    const { openContact } = useContact();

    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-50 dark:bg-neutral-950/80 dark:border-neutral-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
                    <Link href="/">Roomboy</Link>
                </div>
                <nav>
                    <ul className="flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        <li>
                            <Link href="/" className="hover:text-neutral-900 transition-colors dark:hover:text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="/locations" className="hover:text-neutral-900 transition-colors dark:hover:text-white">Locations</Link>
                        </li>
                        <li>
                            <button
                                onClick={openContact}
                                className="text-neutral-900 hover:text-indigo-600 font-semibold transition-colors dark:text-neutral-100 dark:hover:text-indigo-400"
                            >
                                Contact
                            </button>
                        </li>
                        <li>
                            <ModeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
