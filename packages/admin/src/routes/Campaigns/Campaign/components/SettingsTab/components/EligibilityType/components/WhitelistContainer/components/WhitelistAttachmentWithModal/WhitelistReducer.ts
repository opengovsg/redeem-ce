import {
  BaseWhitelistMetaData,
  WhitelistCheckValidityResponseType,
} from 'services/RedeemApi/types'

type WhitelistMetaData = BaseWhitelistMetaData & {
  isEmptyCSV: boolean
  hasInvalidHeader: boolean
  href: string
  hasError: boolean
  whitelistCsv: File | undefined
}

type WhitelistAttachmentData = WhitelistMetaData & {
  isWhitelistSuccessfulUploadModalOpen: boolean
  fileInfoRelatedErrorMessage: string
  isUploading: boolean
  checkingWhitelistProgress: number
}

export const baseMetaDataForWhitelist: BaseWhitelistMetaData = {
  numberOfDuplicates: 0,
  numberOfInvalidIds: 0,
  numberOfRows: 0,
}

export const whitelistInitialAttachmentState: WhitelistAttachmentData = {
  ...baseMetaDataForWhitelist,
  href: '',
  hasError: false,
  whitelistCsv: undefined,
  isWhitelistSuccessfulUploadModalOpen: false,
  fileInfoRelatedErrorMessage: '',
  hasInvalidHeader: false,
  isEmptyCSV: false,
  isUploading: false,
  checkingWhitelistProgress: 0,
}

export type WhitelistMetaDataAction = {
  type:
    | WhitelistCheckValidityResponseType
    | 'CLEAR'
    | 'FILE_INFO_RELATED_ERROR'
    | 'UPLOADING'
    | 'CHECKING'
  payload?: {
    href?: string
    numberOfRows?: number
    numberOfInvalidIds?: number
    numberOfDuplicates?: number
    whitelistCsv?: File | undefined
    fileInfoRelatedErrorMessage?: string
    hasInvalidHeader?: boolean
    isEmptyCSV?: boolean
    checkingWhitelistProgress?: number
  }
}

export const whitelistAttachmentReducer = (
  state: WhitelistAttachmentData,
  action: WhitelistMetaDataAction
): WhitelistAttachmentData => {
  switch (action.type) {
    case WhitelistCheckValidityResponseType.SUCCESS:
      return {
        ...whitelistInitialAttachmentState,
        ...state,
        ...action.payload,
        isWhitelistSuccessfulUploadModalOpen: true,
      }
    case WhitelistCheckValidityResponseType.INVALID_PARAMS:
      return {
        ...whitelistInitialAttachmentState,
        ...state,
        ...action.payload,
        hasError: true,
        hasInvalidHeader: Boolean(action.payload?.hasInvalidHeader),
        isEmptyCSV: Boolean(action.payload?.isEmptyCSV),
      }
    case WhitelistCheckValidityResponseType.ERROR:
      return {
        ...whitelistInitialAttachmentState,
        ...state,
        ...action.payload,
        hasError: true,
      }
    case 'FILE_INFO_RELATED_ERROR':
      return {
        ...whitelistInitialAttachmentState,
        fileInfoRelatedErrorMessage:
          action.payload?.fileInfoRelatedErrorMessage ?? '',
        hasInvalidHeader: false,
        isEmptyCSV: false,
      }
    case 'CLEAR':
      return {
        ...whitelistInitialAttachmentState,
      }
    case 'UPLOADING':
      return {
        ...whitelistInitialAttachmentState,
        ...state,
        isUploading: true,
      }
    case 'CHECKING':
      return {
        ...whitelistInitialAttachmentState,
        ...state,
        checkingWhitelistProgress:
          action.payload?.checkingWhitelistProgress ?? 0,
      }
    default:
      return state
  }
}
