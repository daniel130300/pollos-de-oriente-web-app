import { PRODUCT_API_KEYS } from './index';
import { USER_API_KEYS } from './index';
import { STORE_API_KEYS } from './index';

export const CACHED_QUERIES_MAP = new Map([]);

export const API_KEYS = {
  ...PRODUCT_API_KEYS,
  ...USER_API_KEYS,
  ...STORE_API_KEYS,
};
