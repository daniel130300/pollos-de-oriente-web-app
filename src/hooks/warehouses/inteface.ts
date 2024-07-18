import { EstablishmentTypes } from '../expense-category/interface';

export interface Warehouse {
  id: string;
  name: string;
  has_delivery: null;
  has_pos: null;
  type: EstablishmentTypes.WAREHOUSE | '';
}
