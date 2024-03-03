export const authEnqueue = {
  errors: {
    passwordReset: 'Error enviando correo para reestablecer tu contraseña',
    passwordUpdate: 'Error actualizando la contraseña',
    login: 'Error iniciando sesión',
    signup: 'Error creando cuenta',
  },
  success: {
    passwordReset: 'Si tu correo existe, se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña',
    passwordUpdate: 'Contraseña actualizada exitosamente',
    signup: 'Antes de iniciar sesión, deberás verificar el correo utilizado al momento de crear tu cuenta',
  }
}

export const productEnqueue = {
  errors: {
    create: 'Error creando el producto',
    edit: 'Error editando el product',
    list: 'Error obteniendo el listado de productos',
    count: 'Error obteniendo el conteo de productos',
    detail: 'Error obteniendo el detalle del producto'
  },
  success: {
    create: 'Producto creado exitosamente',
    edit: 'Product editado exitosamente'
  }
}