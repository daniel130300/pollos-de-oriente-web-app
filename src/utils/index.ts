export const parseToCurrency = (value: number): string => {
  // Check if value is a number
  if (typeof value !== 'number' || isNaN(value)) {
      return '';
  }

  // Format the number as currency using toLocaleString method with appropriate parameters for Honduras (Lempiras)
  return value.toLocaleString('es-HN', { style: 'currency', currency: 'HNL' }); // 'es-HN' for Spanish (Honduras), 'HNL' for Honduran Lempiras
}

export const getMinutesInMilliSeconds = (minutes = 0) => {
  return 1000 * 60 * minutes;
};

export const generateFilename = (name: string, file: File) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = file.name.split('.').pop();
  return `${name}-image-${timestamp}-${randomString}.${fileExtension}`;
};

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

export function formatBooleanToStringLabel(value: boolean): string {
  return value ? 'Si' : 'No';
}

export function formatStringToBoolean(input: string): boolean | null {
  const lowerCaseInput = input.toLowerCase().trim();

  if (lowerCaseInput === 'true') {
    return true;
  }

  if (lowerCaseInput === 'false') {
    return false;
  }

  return null;
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1);
}