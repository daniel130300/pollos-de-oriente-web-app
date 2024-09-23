import { EstablishmentTypes } from '../expense-category/interface';

export interface Store {
  id: string;
  name: string;
  has_delivery: boolean;
  has_pos: boolean;
  type: EstablishmentTypes.STORE | '';
}

export interface EditableStoreProduct {
  id: string;
  name: string;
  sale_price: string;
  editable: boolean;
}

export interface EditableStoreCombo {
  id: string;
  name: string;
  sale_price: string;
  editable: boolean;
}
