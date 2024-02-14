type Site = {
    site_id: string;
    site_name: string;
    site_banner?: string;
    site_images?: string[];
    address?: string;
    is_active: boolean;
    created_at: string;
    visitor_count: string
}

type MostVisitedSite = {
    site_name: string,
    count: string
}[]

export type {
    Site,
    MostVisitedSite
}