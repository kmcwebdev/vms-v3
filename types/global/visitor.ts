type Visitor  = {
  visitor_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  image_url: string | null;
  person_to_visit: string;
  company_to_visit: string;
  site_id: string;
  site_name: string;
  reason_of_visit_id: string;
  reason_name: string,
  created_at: string;
}

type RecentVisitors = Pick<Visitor, 'visitor_id' | 'first_name' | 'last_name' | 'image_url' | 'site_name' | 'created_at'>;

export type {
    Visitor,
    RecentVisitors
}