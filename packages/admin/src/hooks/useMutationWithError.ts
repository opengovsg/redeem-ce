import { useMutation, UseMutationOptions } from 'react-query'
import { AxiosError } from 'axios'
import { Dispatch } from 'react'
import toast from 'react-hot-toast'

type UseMutationWithErrorOptions<TData, TVariables> = UseMutationOptions<
  TData,
  AxiosError,
  TVariables
>

type ZodError = {
  key: string
  message: string
  field?: string
  position?: string
}

export const useMutationWithError = <TData = unknown, TVariables = unknown>(
  options: UseMutationWithErrorOptions<TData, TVariables>,
  setResults: Dispatch<any[]>
) => {
  return useMutation<TData, AxiosError, TVariables>({
    ...options,
    // This is for failed zod validation, all other errors are handled and
    // returned as successful http codes
    onError: (data) => {
      const errorData = data as {
        response?: {
          data?: {
            error?: {
              code: string
              message: string
              type: string
              data: { multipleZodErrors?: ZodError[] }
            }
          }
        }
      }
      toast.error(
        'Something went wrong. Check downloaded CSV for more information.'
      )
      if (
        errorData.response?.data?.error &&
        !errorData.response.data?.error?.data?.multipleZodErrors
      ) {
        const errorMessage = errorData.response.data.error.message
        // Splitting here because our zod returns comma separated errors if more than 1 error is present
        const splitErrorMessages = errorMessage
          .split('.,')
          .map((message) => message.trim())
        // Formatting for CSVLink which takes in array of objects, where key will be the column header
        const errorObjects = splitErrorMessages.map((error) => ({ error }))
        setResults(errorObjects)
      } else {
        const zodErrors =
          errorData.response?.data?.error?.data?.multipleZodErrors || []
        const formattedErrors = zodErrors.map((zodError) => {
          return {
            error: `Error in format of ${zodError.field ? zodError.field : zodError.key} ${
              zodError.position
                ? `in row ${Number(zodError.position) + 1}:`
                : ':'
            } ${zodError.message}`,
          }
        })

        setResults(formattedErrors)
      }
    },
  })
}
