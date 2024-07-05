export const log = (message?: unknown, ...optionalParams: unknown[]) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(message, ...optionalParams)
  }
}

export const warn = (message?: unknown, ...optionalParams: unknown[]) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(message, ...optionalParams)
  }
}
