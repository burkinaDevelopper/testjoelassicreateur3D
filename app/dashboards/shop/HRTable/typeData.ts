export interface Item {
  id: number | string;
  title: string;
  slug: string;
  description?: string;
  price: string;
  reduction: string;
  type: string;
  path_file?: string;
  url_file?: string;
  thumbnail_path?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at?: string;
}
