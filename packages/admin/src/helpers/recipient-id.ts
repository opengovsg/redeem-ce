import type { ValidationResult } from './types'

export type SplittedRecipientIdForMasking = {
  toMask: string
  toShow: string
}

export class InvalidRecipientIdError extends Error {
  recipientId: string

  reason: string

  constructor({
    recipientId,
    reason,
  }: {
    recipientId: string
    reason: string
  }) {
    super(`Invalid Recipient Id: ${recipientId}. Reason: ${reason}`)
    this.recipientId = recipientId
    this.reason = reason
  }
}

export function validateRecipientId(recipientId: string): ValidationResult {
  // Emptiness check for recipient id should come first as values like
  // NaN may cause an error later on
  if (!recipientId) {
    return {
      valid: false,
      reason: 'must not be empty',
    }
  }

  // TODO: Consider implementing
  return { valid: true }
}

export function splitRecipientIdForMasking(
  recipientId: string
): SplittedRecipientIdForMasking {
  const validationResult = validateRecipientId(recipientId)
  if (!validationResult.valid) {
    throw new InvalidRecipientIdError({
      recipientId,
      reason: validationResult.reason,
    })
  }

  const indexLastFourChars = recipientId.length - 4
  return {
    toMask: recipientId.substring(0, indexLastFourChars),
    toShow: recipientId.substring(indexLastFourChars),
  }
}
