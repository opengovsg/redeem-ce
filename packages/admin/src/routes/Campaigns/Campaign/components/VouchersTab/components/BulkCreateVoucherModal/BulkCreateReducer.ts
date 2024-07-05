import { BulkCreateCheckValidityResponseType } from 'services/RedeemApi/types'

type BulkCreateMetaData = {
  isEmptyCSV: boolean
  hasInvalidHeader: boolean
  numberOfEmptyRows: number
  numberOfInvalidRecipientIds: number
  numberOfInvalidMobileNumber: number
  hasError: boolean
  href: string
  numberOfRows: number
  numberOfDuplicateMobileNumber: number
  numberOfDuplicateName: number
  numberOfDuplicateRecipientIds: number
  numberOfMissingMobileNumber: number
  numberOfMissingName: number
  numberOfMissingRecipientIds: number
  bulkCreateCsv: File | undefined
  jobId: string
  isSubmittedJobModalOpen: boolean
}

export type BulkCreateAttachmentData = BulkCreateMetaData & {
  fileInfoRelatedErrorMessage: string
  isSubmitting: boolean
  checkingBulkCreateProgress: number
}

export const baseMetaDataForBulkCreate = {
  numberOfRows: 0,
  numberOfEmptyRows: 0,
  numberOfInvalidRecipientIds: 0,
  numberOfInvalidMobileNumber: 0,
  numberOfDuplicateMobileNumber: 0,
  numberOfDuplicateName: 0,
  numberOfDuplicateRecipientIds: 0,
  numberOfMissingMobileNumber: 0,
  numberOfMissingName: 0,
  numberOfMissingRecipientIds: 0,
}

export const bulkCreateInitialAttachmentState: BulkCreateAttachmentData = {
  ...baseMetaDataForBulkCreate,
  href: '',
  hasError: false,
  bulkCreateCsv: undefined,
  fileInfoRelatedErrorMessage: '',
  isEmptyCSV: false,
  hasInvalidHeader: false,
  isSubmitting: false,
  checkingBulkCreateProgress: 0,
  jobId: '',
  isSubmittedJobModalOpen: false,
}

export type BulkCreateMetaDataAction = {
  type:
    | BulkCreateCheckValidityResponseType
    | 'CLEAR'
    | 'FILE_INFO_RELATED_ERROR'
    | 'CHECKING'
    | 'SUBMITTING'
    | 'POLLING'
  payload?: {
    // Uploaded file errors eg. not CSV
    fileInfoRelatedErrorMessage?: string
    // Checking progress number for attachment dropzone
    checkingBulkCreateProgress?: number
    // Generic errors within CSV
    isEmptyCSV?: boolean
    hasInvalidHeader?: boolean
    // Logic errors within CSV
    numberOfEmptyRows?: number
    numberOfInvalidRecipientIds?: number
    numberOfInvalidMobileNumber?: number
    href?: string // Href to download CSV with errors/details
    // Summary of information within CSV
    numberOfRows?: number
    numberOfDuplicateMobileNumber?: number
    numberOfDuplicateName?: number
    numberOfDuplicateRecipientIds?: number
    numberOfMissingMobileNumber?: number
    numberOfMissingName?: number
    numberOfMissingRecipientIds?: number
    bulkCreateCsv?: File | undefined // Csv that has passed the checks, to be used for submitting
    // Job id set after job is submitted
    jobId?: string
    isSubmittedJobModalOpen?: boolean
  }
}

export const bulkCreateAttachmentReducer = (
  state: BulkCreateAttachmentData,
  action: BulkCreateMetaDataAction
): BulkCreateAttachmentData => {
  switch (action.type) {
    case BulkCreateCheckValidityResponseType.CHECKING_SUCCESS:
      return {
        ...bulkCreateInitialAttachmentState,
        ...state,
        ...action.payload,
      }
    case BulkCreateCheckValidityResponseType.INVALID_PARAMS:
      return {
        ...bulkCreateInitialAttachmentState,
        ...state,
        ...action.payload,
        hasError: true,
        isEmptyCSV: Boolean(action.payload?.isEmptyCSV),
        hasInvalidHeader: Boolean(action.payload?.hasInvalidHeader),
      }
    case BulkCreateCheckValidityResponseType.ERROR:
      return {
        ...bulkCreateInitialAttachmentState,
        ...state,
        ...action.payload,
        hasError: true,
      }
    case 'FILE_INFO_RELATED_ERROR':
      return {
        ...bulkCreateInitialAttachmentState,
        fileInfoRelatedErrorMessage:
          action.payload?.fileInfoRelatedErrorMessage ?? '',
        isEmptyCSV: false,
        hasInvalidHeader: false,
      }
    case 'CLEAR':
      return {
        ...bulkCreateInitialAttachmentState,
      }
    case 'CHECKING':
      return {
        ...bulkCreateInitialAttachmentState,
        ...state,
        checkingBulkCreateProgress:
          action.payload?.checkingBulkCreateProgress ?? 0,
      }
    case 'SUBMITTING':
      return {
        ...bulkCreateInitialAttachmentState,
        ...state,
        isSubmitting: true,
      }
    case 'POLLING':
      return {
        ...bulkCreateInitialAttachmentState,
        ...state,
        jobId: action.payload?.jobId ?? '',
        isSubmittedJobModalOpen: true,
      }
    default:
      return state
  }
}
