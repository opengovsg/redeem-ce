export const fileValidation = (file: File) => {
  return /^.+\.csv$/.test(file.name)
    ? null
    : 'You have uploaded an unsupported file format, please upload a CSV file'
}
