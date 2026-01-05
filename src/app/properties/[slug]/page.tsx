import { propertyService } from '@/services/property.service';
import { Metadata } from 'next';
import { createPropertyViewModel } from '@/models/property.view-model';
import { PropertySections } from '@/components/properties/PropertySections';
import { PropertyHero } from '@/components/properties/layout/HeroSection';
import { PricingCard } from '@/components/properties/layout/PricingCard';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const property = await propertyService.getPropertyById(slug);

    if (!property) {
        return {
            title: 'Property Not Found | Roomboy',
            description: 'The requested property could not be found.',
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://roomboy.com';
    const url = `${baseUrl}/properties/${slug}`;

    return {
        title: `${property.title} in ${property.location.city} | Roomboy`,
        description: `Check out ${property.title} located in ${property.location.city}. Category: ${property.category}. Price: ${property.price}`,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${property.title} in ${property.location.city} | Roomboy`,
            description: `Check out ${property.title} located in ${property.location.city}.`,
            url: url,
            type: 'website',
            siteName: 'Roomboy',
            images: [
                {
                    url: property.mainImage || '/og-placeholder.jpg',
                    width: 1200,
                    height: 630,
                    alt: property.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${property.title} in ${property.location.city} | Roomboy`,
            description: `Check out ${property.title} located in ${property.location.city}.`,
            images: [property.mainImage || '/twitter-placeholder.jpg'],
        },
    };
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug } = await params;
    const property = await propertyService.getPropertyById(slug);

    if (!property) {
        return (
            <section className="container mx-auto px-4 py-12">
                <h1 className="text-2xl font-bold">Property Not Found</h1>
                <p className="mt-2 text-neutral-600">We couldn't find the property you're looking for.</p>
            </section>
        );
    }

    const viewModel = createPropertyViewModel(property);

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
            <PropertyHero viewModel={viewModel} />

            <div className="grid lg:grid-cols-3 gap-12 mt-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <PropertySections viewModel={viewModel} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 relative">
                    <div className="sticky top-24">
                        <PricingCard viewModel={viewModel} />
                    </div>
                </div>
            </div>
        </main>
    );
}