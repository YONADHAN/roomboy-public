import { locationService } from '@/services/location.service';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://roomboy.com';
    const url = `${baseUrl}/locations`;

    return {
        title: 'Browse Locations | Roomboy',
        description: 'Explore properties in various locations. Find housing in your preferred city or state.',
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: 'Browse Locations | Roomboy',
            description: 'Explore properties in various locations. Find housing in your preferred city or state.',
            url: url,
            type: 'website',
            siteName: 'Roomboy',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Browse Locations | Roomboy',
            description: 'Explore properties in various locations.',
        },
    };
}

export default async function LocationsPage() {
    const locations = await locationService.getAll();

    if (locations.length === 0) {
        return (
            <section className="container mx-auto px-4 py-20 text-center">
                <header className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">No Locations Yet</h1>
                    <p className="text-neutral-500 mb-8">
                        We're currently expanding! Please check back soon for properties in your area.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-all"
                    >
                        Return Home
                    </Link>
                </header>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <header className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">Locations</h1>
                <p className="text-muted-foreground">Choose your preferred location to see available properties in that area.</p>
            </header>
            <nav>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {locations.map((location) => (
                        <li key={location.locationId} className="group">
                            <Link
                                href={`/properties?location=${location.slug}`}
                                className="block h-full p-6 bg-card border border-border rounded-xl hover:border-muted-foreground/50 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex flex-col h-full">
                                    <h2 className="text-lg font-semibold text-foreground mb-1 group-hover:text-blue-600 transition-colors">
                                        {location.name}
                                    </h2>
                                    <p className="text-muted-foreground text-sm mt-auto">
                                        {location.state}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
