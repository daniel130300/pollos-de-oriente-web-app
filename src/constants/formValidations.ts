export const authFormsValidations = {
  email: {
    valid: 'El correo debe ser valido',
    required: 'El correo es un campo requerido',
  },
  password: {
    required: 'La contraseña es un campo requerido',
    min: (value: number) =>
      `La contraseña debe tener al menos ${value} caracteres`,
  },
  confirmPassword: {
    oneOf: 'Las contraseñas deben coincidir',
    required: 'Es necesario confirmar la contraseña',
  },
};

export const productFormsValidations = {
  select_product: {
    required: 'Debes seleccionar un producto',
  },
  name: {
    required: 'El nombre es un campo requerido',
  },
  search_id: {
    required: 'El id de busqueda es un campo requerido',
  },
  quantity: {
    typeError: 'La cantidad debe ser un número',
    required: 'La cantidad es un campo requerido',
    min: (value: number) => `La cantidad debe ser mayor o igual a ${value}`,
  },
  inventory_subtraction: {
    required: "El campo 'Se resta de manera' es requerido",
  },
  can_be_purchased_only: {
    required: "El campo 'Se ingresa como' es requerido",
  },
  expense_category_id: {
    required: 'Seleccione una categoría de gasto',
  },
  product_image: 'La imagen debe ser un archivo de imagen válido',
  sale_price: {
    typeError: 'El precio de venta debe ser un número',
    required: 'El precio de venta es requerido',
    min: (value: number) => `La cantidad debe ser mayor o igual a ${value}`,
  },
};

export const comboFormsValidations = {
  select_combo: {
    required: 'Debes seleccionar un combo',
  },
  name: {
    required: 'El nombre es un campo requerido',
  },
  search_id: {
    required: 'El id de busqueda es un campo requerido',
  },
  quantity: {
    typeError: 'La cantidad debe ser un número',
    required: 'La cantidad es un campo requerido',
    min: (value: number) => `La cantidad debe ser mayor o igual a ${value}`,
  },
  combo_image: 'La imagen debe ser un archivo de imagen válido',
  combo_products: {
    min: (value: number) => `El combo tener al menos ${value} producto`,
  },
  sale_price: {
    typeError: 'El precio de venta debe ser un número',
    required: 'El precio de venta es requerido',
    min: (value: number) => `La cantidad debe ser mayor o igual a ${value}`,
  },
};

export const storeFormsValidations = {
  name: {
    required: 'El nombre es un campo requerido',
  },
  has_delivery: {
    required: 'Es necesario especificar si la tienda tiene delivery o no',
  },
  has_pos: {
    required: 'Es necesario especificar si la tienda tiene pos o no',
  },
  combo_store_or_products: {
    min: (value: number) =>
      `El menu de la tienda debe tener al menos ${value} 1 combo o producto`,
  },
};

export const expenseCategoryFormsValidations = {
  name: {
    required: 'El nombre es un campo requerido',
  },
  type: {
    required: 'El tipo es un campo requerido',
  },
  available_at: {
    required: 'El campo disponible en es un campo requerido',
  },
};
