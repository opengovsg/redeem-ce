import {useFlags} from 'launchdarkly-react-client-sdk'

/**
 * This hook corresponds directly to launchdarkly json flags on a 1 to 1 basis. Since useFlags can generally access all flags in an environment,
 * we have created a wrapper for each type of flag to prevent accidental access of non-existent flags. This approach ensures that accessing flags
 * that do not exist will not result in an error. For instance, if a non-existent JSON flag is accessed and then destructed, it will result in the
 * destruction of an undefined value, which could crash the app.
 */
export function useJSONFlags<T extends Record<string, Record<string, unknown>>>(
  key: keyof T,
) {
  const flags = useFlags<T>()
  return flags[key] ?? {}
}
