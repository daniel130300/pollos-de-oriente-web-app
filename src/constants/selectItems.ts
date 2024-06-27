import { EstablishmentTypes, ExpenseCategoryTypes } from 'src/hooks/expense-category/interface';
import { translateEstablishment, translateExpenseCategoryType } from 'src/utils';

export const expenseCategoryTypeItems = [
  { label: translateExpenseCategoryType(ExpenseCategoryTypes.INVENTORY), value: ExpenseCategoryTypes.INVENTORY },
  { label: translateExpenseCategoryType(ExpenseCategoryTypes.NON_INVENTORY), value: ExpenseCategoryTypes.NON_INVENTORY }
];

export const establishmentItems = [
  { label: translateEstablishment(EstablishmentTypes.STORE), value: EstablishmentTypes.STORE },
  { label: translateEstablishment(EstablishmentTypes.WAREHOUSE), value: EstablishmentTypes.WAREHOUSE }
];