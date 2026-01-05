import { MetadataRoute } from 'next';
import { propertyService } from '@/services/property.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://roomboy.com';

    // Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/locations`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    // Dynamic Routes (Properties)
    const properties = await propertyService.getPublicProperties();
    const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
        url: `${baseUrl}/properties/${property.propertyId}`,
        lastModified: new Date(), // Ideally this would come from property.updatedAt
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...propertyRoutes];
}
