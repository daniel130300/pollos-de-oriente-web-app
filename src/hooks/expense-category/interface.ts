export interface ExpenseCategory {
  id: string;
  name: string;
  type: ExpenseCategoryTypes | null;
  available_at: EstablishmentTypes | null;
}

export enum ExpenseCategoryTypes {
  INVENTORY = 'inventory',
  NON_INVENTORY = 'non-inventory'
}

export enum EstablishmentTypes {
  STORE = 'store',
  WAREHOUSE = 'warehouse'
}