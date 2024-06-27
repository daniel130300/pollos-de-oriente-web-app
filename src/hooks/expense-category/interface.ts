export interface ExpenseCategory {
  id: string;
  name: string;
  type: ExpenseCategoryTypes | '';
  available_at: EstablishmentTypes | '';
}

export enum ExpenseCategoryTypes {
  INVENTORY = 'inventory',
  NON_INVENTORY = 'non-inventory',
}

export enum EstablishmentTypes {
  STORE = 'store',
  WAREHOUSE = 'warehouse',
}
