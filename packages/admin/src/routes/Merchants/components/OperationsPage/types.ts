import { CSSProperties, Dispatch } from 'react'
import { ExpectedParam, Operation } from '../../constants/types'

export interface OperationsPageProps {
  isLoading: boolean
  results: any[]
  setResults: Dispatch<any[]>
  operation: Operation
  campaignId?: string
  setCampaignId?: Dispatch<string>
  campaignIdFrom?: string
  setCampaignIdFrom?: Dispatch<string>
  campaignIdTo?: string
  setCampaignIdTo?: Dispatch<string>
  userId?: string
  setUserId?: Dispatch<string>
  merchantId?: string
  setMerchantId?: Dispatch<string>
  parsedCsv?: unknown[]
  setParsedCsv?: Dispatch<unknown[]>
  onClick: () => void
  roles?: string[]
  setRoles?: Dispatch<string[]>
  merchantType?: string
  setMerchantType?: Dispatch<string>
  category?: string
  setCategory?: Dispatch<string>
  style?: CSSProperties | undefined
}

export interface OperationsHeaderProps {
  operation: Operation
}

export interface RequiredFieldsProps {
  expectedParams: ExpectedParam[]
}

export interface DownloadCSVTemplateProps {
  csv: string[][]
  csvName: string
}

export interface CampaignInputProps {
  setCampaign: Dispatch<string>
}

export interface CategoryInputProps {
  setCategory: Dispatch<string>
}

export interface UncontrolledTextInputProps {
  title: string
  template: string
  setText: Dispatch<string>
}

export interface RolesInputProps {
  roles: string[]
  setRoles: Dispatch<string[]>
}

export interface MerchantTypeInputProps {
  merchantType: string
  setMerchantType: Dispatch<string>
}

export interface AttachmentInputProps {
  csvFile: File | undefined
  setCsvFile: Dispatch<File | undefined>
  setParsedCsv: Dispatch<any[]>
}
