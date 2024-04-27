export interface Product {
  id: string;
  name: string;
  unity: string;
  purchase_price: number | string;
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null
}