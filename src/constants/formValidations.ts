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
  unity: {
    required: 'La unidad es un campo requerido',
  },
  quantity: {
    typeError: 'La cantidad debe ser un número',
    required: 'La cantidad es un campo requerido',
    min: (value: number) => `La cantidad debe ser mayor o igual a ${value}`,
  },
  sale_price: {
    typeError: 'El precio de venta debe ser un número',
    required: 'El precio de venta es un campo requerido',
    min: (value: number) =>
      `El precio de venta debe ser mayor o igual a ${value}`,
  },
  purchase_price: {
    typeError: 'El precio de compra debe ser un número',
    required: 'El precio de venta es un campo requerido',
    min: (value: number) =>
      `El precio de compra debe ser mayor o igual a ${value}`,
  },
  product_image: 'La imagen debe ser un archivo de imagen válido',
};

export const storeFormsValidations = {
  name: {
    required: 'El nombre es un campo requerido',
  },
  is_main: {
    required: 'Es necesario especificar si la tienda es la principal o no',
  },
};
