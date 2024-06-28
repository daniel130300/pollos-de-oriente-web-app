import { EstablishmentTypes } from '../expense-category/interface';

export interface Product {
  id: string;
  search_id: string;
  name: string;
  inventory_subtraction: ProductInventorySubtraction | '';
  can_be_purchased_only: EstablishmentTypes | '';
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null;
  expense_category_id: string;
}

export enum ProductInventorySubtraction {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}

export interface EditableProductDetail {
  id: string;
  name: string;
  arithmetic_quantity: string;
  editable: boolean;
}
