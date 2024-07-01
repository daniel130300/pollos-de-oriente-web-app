import {
  EstablishmentTypes,
  ExpenseCategoryTypes,
} from 'src/hooks/expense-category/interface';
import { ProductInventorySubtraction } from 'src/hooks/products/interface';

export function translateExpenseCategoryType(category: ExpenseCategoryTypes) {
  switch (category) {
    case ExpenseCategoryTypes.INVENTORY:
      return 'inventario';
    case ExpenseCategoryTypes.NON_INVENTORY:
      return 'no inventario';
  }
}

export function translateEstablishment(establishment: EstablishmentTypes) {
  switch (establishment) {
    case EstablishmentTypes.STORE:
      return 'tienda';
    case EstablishmentTypes.WAREHOUSE:
      return 'bodega';
  }
}

export function translateProductInventorySubtraction(
  inventorySubtraction: ProductInventorySubtraction,
) {
  switch (inventorySubtraction) {
    case ProductInventorySubtraction.AUTOMATIC:
      return 'automatico';
    case ProductInventorySubtraction.MANUAL:
      return 'manual';
  }
}
