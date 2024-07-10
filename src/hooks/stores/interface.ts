import { EstablishmentTypes } from '../expense-category/interface';

export interface Store {
  id: string;
  name: string;
  has_delivery: boolean;
  has_pos: boolean;
  type: EstablishmentTypes | '';
}
