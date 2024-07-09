export interface Combo {
  id: string;
  search_id: string;
  name: string;
  bucket_id: string | null;
  file_name: string | null;
  combo_image: File | null;
}

export interface EditableComboProduct {
  id: string;
  name: string;
  quantity: string;
  editable: boolean;
}
