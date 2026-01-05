import {
    LucideIcon,
    Home,
    DollarSign,
    Shield,
    Video,
    FileText,
    Armchair,
    Wrench,
    Grid,
    Dog,
    Cigarette,
    Users,
    ClipboardList,
    CheckCircle
} from 'lucide-react';

export enum AttributeSection {
    Overview = 'Overview',
    Pricing = 'Pricing',
    Amenities = 'Amenities',
    Rules = 'Rules & Preferences',
    Media = 'Media',
}

export enum AttributeType {
    Text = 'text',
    Paragraph = 'paragraph',
    Number = 'number',
    Currency = 'currency',
    Boolean = 'boolean',
    Array = 'array',
    YouTube = 'youtube',
}

export interface AttributeConfig {
    label: string;
    section: AttributeSection;
    type: AttributeType;
    icon: LucideIcon;
}

export const ATTRIBUTE_CONFIG: Record<string, AttributeConfig> = {
    // Overview
    description: {
        label: 'Description',
        section: AttributeSection.Overview,
        type: AttributeType.Paragraph,
        icon: FileText,
    },
    property_type: {
        label: 'Property Type',
        section: AttributeSection.Overview,
        type: AttributeType.Text,
        icon: Home,
    },
    furnishing: {
        label: 'Furnishing',
        section: AttributeSection.Overview,
        type: AttributeType.Text,
        icon: Armchair,
    },

    // Pricing
    monthly_rent: {
        label: 'Monthly Rent',
        section: AttributeSection.Pricing,
        type: AttributeType.Currency,
        icon: DollarSign,
    },
    security_deposit: {
        label: 'Security Deposit',
        section: AttributeSection.Pricing,
        type: AttributeType.Currency,
        icon: Shield,
    },
    maintenance_charges: {
        label: 'Maintenance Charges',
        section: AttributeSection.Pricing,
        type: AttributeType.Currency,
        icon: Wrench,
    },

    // Amenities
    amenities: {
        label: 'Amenities',
        section: AttributeSection.Amenities,
        type: AttributeType.Array,
        icon: Grid,
    },

    // Rules / Preferences
    pets_allowed: {
        label: 'Pets Allowed',
        section: AttributeSection.Rules,
        type: AttributeType.Boolean,
        icon: Dog,
    },
    smoking_allowed: {
        label: 'Smoking Allowed',
        section: AttributeSection.Rules,
        type: AttributeType.Boolean,
        icon: Cigarette,
    },
    preferred_tenants: {
        label: 'Preferred Tenants',
        section: AttributeSection.Rules,
        type: AttributeType.Array,
        icon: Users,
    },
    house_rules: {
        label: 'House Rules',
        section: AttributeSection.Rules,
        type: AttributeType.Paragraph,
        icon: ClipboardList,
    },

    // Media
    youtube_link: {
        label: 'Video Tour',
        section: AttributeSection.Media,
        type: AttributeType.YouTube,
        icon: Video,
    },
};
