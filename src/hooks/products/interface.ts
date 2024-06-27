export interface Product {
  id: string;
  name: string;
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null
}