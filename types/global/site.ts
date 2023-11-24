type Site = {
    site_id: string;
    site_name: string;
    site_banner?: string;
    site_images?: string[];
    address?: string;
    is_active: boolean;
    created_at: string;
}

export type {
    Site
}