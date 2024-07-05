type FieldText = {
  title: string
  description: string
}

type FieldsTextAndDownloadTemplateProps = {
  fields: FieldText[]
  downloadFunction: () => void
  isLoading: boolean
  headerText: string
  isDownloadButtonDisabled?: boolean
}

export type { FieldsTextAndDownloadTemplateProps }
