import { EditableProduct } from '../products/interface';

export interface Store {
  id: string;
  name: string;
  is_main: boolean;
  products?: EditableProduct[];
}
