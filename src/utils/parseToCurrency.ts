export const parseToCurrency = (value: number): string => {
  // Check if value is a number
  if (typeof value !== 'number' || isNaN(value)) {
      return '';
  }

  // Format the number as currency using toLocaleString method with appropriate parameters for Honduras (Lempiras)
  return value.toLocaleString('es-HN', { style: 'currency', currency: 'HNL' }); // 'es-HN' for Spanish (Honduras), 'HNL' for Honduran Lempiras
}