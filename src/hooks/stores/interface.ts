import { Product } from "src/routes/_auth/stores/add-store.lazy";

export interface Store {
  id: string;
  name: string;
  is_main: boolean;
  products?: Product[];
}