import { PublicProperty } from '@/services/property.service';
import { ATTRIBUTE_CONFIG, AttributeConfig, AttributeSection } from '@/config/attribute.config';

// Omit icon from the interface as it is a component and not serializable
export interface ComputedAttribute extends Omit<AttributeConfig, 'icon'> {
    key: string;
    value: any;
}

export interface PropertySectionData {
    title: string;
    attributes: ComputedAttribute[];
}

export type PropertyViewModel = {
    core: PublicProperty;
    displayPrice: number;
    images: string[];
    description: string;
    video?: {
        type: 'youtube' | 'other';
        url: string;
        embedUrl: string;
        thumbnailUrl?: string;
    };
    highlights: ComputedAttribute[];
    sections: Partial<Record<AttributeSection, PropertySectionData>>;
};

export const createPropertyViewModel = (property: PublicProperty): PropertyViewModel => {
    const sections: Partial<Record<AttributeSection, PropertySectionData>> = {};

    // Get all attributes from property, or empty object if none
    const rawAttributes = property.attributes || {};

    // 1. Resolve Display Price (Prefer attribute > core price)
    const displayPrice = Number(rawAttributes['monthly_rent']) || property.price || 0;

    // 2. Resolve Images (Prefer array > mainImage)
    const images = (property.images && property.images.length > 0)
        ? property.images.filter(Boolean)
        : [property.mainImage].filter(Boolean);

    // 3. Extract Specific Fields
    const description = rawAttributes['description'] || '';

    // Video normalization
    const rawVideoUrl = rawAttributes['youtube_link'] || rawAttributes['video_url'];
    let video: PropertyViewModel['video'] | undefined;

    if (rawVideoUrl && typeof rawVideoUrl === 'string') {
        let embedUrl = rawVideoUrl;
        let type: 'youtube' | 'other' = 'other';
        let thumbnailUrl: string | undefined;

        // Simple YouTube parsing
        if (rawVideoUrl.includes('youtube.com') || rawVideoUrl.includes('youtu.be')) {
            type = 'youtube';
            const videoIdMatch = rawVideoUrl.match(/(?:v=|youtu\.be\/|\/embed\/)([^&?]+)/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoId = videoIdMatch[1];
                embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
        }

        video = {
            type,
            url: rawVideoUrl,
            embedUrl,
            thumbnailUrl
        };
    }

    // 4. Extract Highlights (to be shown in Hero Right)
    // We will look for specific keys like 'property_type', 'furnishing_status'
    const highlights: ComputedAttribute[] = [];

    // Attributes to exclude from generic sections because they are shown elsewhere
    const EXCLUDED_KEYS = new Set([
        'monthly_rent', // Sticky Pricing
        'description',  // Hero Right
        'video_url',    // Hero Slider
        'youtube_link', // Hero Slider
        'property_type', // Hero Highlights
        'furnishing_status', // Hero Highlights
        // Also exclude keys handled by specific sections to avoid duplication
        'preferred_tenants',
        'room_type',
        'min_stay_months',
        'notice_period_days',
        'floor_number',
        'total_floors',
        'non_veg_allowed',
        'smoking_allowed',
        'pets_allowed',
        'visitors_allowed',
        'visiting_hours',
        'house_rules',
        'amenities',
        'nearby_landmarks',
        'latitude',
        'longitude',
        // Exclude coordinate objects if they exist
        'coordinates'
    ]);

    // Iterate over our CONFIG (whitelist approach)
    Object.entries(ATTRIBUTE_CONFIG).forEach(([key, config]) => {
        const value = rawAttributes[key];

        // Skip if value is null, undefined, or empty string (unless boolean false)
        if (value === null || value === undefined || value === '') {
            return;
        }

        // Special handling for empty arrays
        if (Array.isArray(value) && value.length === 0) {
            return;
        }

        // Prepare serializable attribute
        const { icon, ...serializableConfig } = config;
        const computedAttr: ComputedAttribute = {
            key,
            value,
            ...serializableConfig,
        };

        // Capture Highlights
        if (key === 'property_type' || key === 'furnishing_status') {
            highlights.push(computedAttr);
        }

        // Skip if excluded from generic layout
        if (EXCLUDED_KEYS.has(key)) {
            return;
        }

        // Initialize section if not exists
        if (!sections[config.section]) {
            sections[config.section] = {
                title: config.section,
                attributes: [],
            };
        }

        // Add to section
        sections[config.section]!.attributes.push(computedAttr);
    });

    return {
        core: property,
        displayPrice,
        images,
        description,
        video,
        highlights,
        sections,
    };
};
