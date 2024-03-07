export const authSnackbarMessages = {
  errors: {
    passwordReset: 'Error enviando correo para reestablecer tu contraseña',
    passwordUpdate: 'Error actualizando la contraseña',
    login: 'Error iniciando sesión',
    signup: 'Error creando cuenta',
    logout: 'Error cerrando sesión',
    getUser: 'Error obteniendo la información del usuario'
  },
  success: {
    passwordReset: 'Si tu correo existe, se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña',
    passwordUpdate: 'Contraseña actualizada exitosamente',
    signup: 'Antes de iniciar sesión, deberás verificar el correo utilizado al momento de crear tu cuenta',
    logout: 'Se ha cerrando sesión exitosamente'
  }
}

export const productSnackbarMessages = {
  errors: {
    create: 'Error creando el producto',
    edit: 'Error editando el producto',
    list: 'Error obteniendo el listado de productos',
    count: 'Error obteniendo el conteo de productos',
    detail: 'Error obteniendo el detalle del producto',
    imageDelete: 'Error eliminando la imagen del producto',
    delete: 'Error eliminando el producto'
  },
  success: {
    create: 'Producto creado exitosamente',
    edit: 'Producto editado exitosamente',
    imageDelete: 'Imagen del producto eliminada exitosamente',
    delete: 'Producto eliminado exitosamente'
  }
}