export const generateFilename = (name: string, file: File) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = file.name.split('.').pop();
  return `${name}-image-${timestamp}-${randomString}.${fileExtension}`;
};
