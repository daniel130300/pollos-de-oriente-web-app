import {
  EstablishmentTypes,
  ExpenseCategoryTypes,
} from 'src/hooks/expense-category/interface';
import { ProductInventorySubtraction } from 'src/hooks/products/interface';
import {
  translateEstablishment,
  translateExpenseCategoryType,
  translateProductInventorySubtraction,
} from 'src/utils';

export const expenseCategoryTypeItems = [
  {
    label: translateExpenseCategoryType(ExpenseCategoryTypes.INVENTORY),
    value: ExpenseCategoryTypes.INVENTORY,
  },
  {
    label: translateExpenseCategoryType(ExpenseCategoryTypes.NON_INVENTORY),
    value: ExpenseCategoryTypes.NON_INVENTORY,
  },
];

export const establishmentItems = [
  {
    label: translateEstablishment(EstablishmentTypes.STORE),
    value: EstablishmentTypes.STORE,
  },
  {
    label: translateEstablishment(EstablishmentTypes.WAREHOUSE),
    value: EstablishmentTypes.WAREHOUSE,
  },
];

export const inventorySubtractionItems = [
  {
    label: translateProductInventorySubtraction(
      ProductInventorySubtraction.AUTOMATIC,
    ),
    value: ProductInventorySubtraction.AUTOMATIC,
  },
  {
    label: translateProductInventorySubtraction(
      ProductInventorySubtraction.MANUAL,
    ),
    value: ProductInventorySubtraction.MANUAL,
  },
];

export const apiItems = (apiItems: any) =>
  apiItems?.map((value: any) => ({
    label: value.name,
    value: value.id,
  })) || [];

export const booleanItems = [
  {
    label: 'Si',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];
