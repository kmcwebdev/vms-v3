type Site = {
    site_id: string,
    site_name: string,
    site_banner: string | null,
    site_images: string | null,
    address: string,
    created_at: string,
    visitor_count: number
}

type MostVisitedSite = {
    site_name: string,
    count: string
}[]

export type {
    Site,
    MostVisitedSite
}