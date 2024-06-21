import { 
  PRODUCT_API_KEYS, 
  EXPENSES_API_KEYS, 
  USER_API_KEYS, 
  STORE_API_KEYS 
} from './index';

export const API_KEYS = {
  ...PRODUCT_API_KEYS,
  ...USER_API_KEYS,
  ...STORE_API_KEYS,
  ...EXPENSES_API_KEYS
};