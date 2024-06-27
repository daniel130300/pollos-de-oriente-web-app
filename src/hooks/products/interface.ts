export interface Product {
  id: string;
  name: string;
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null;
}

export interface EditableProduct {
  id: string;
  name: string;
  quantity: string;
  sale_price: string;
  editable: boolean;
}
