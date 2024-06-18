// This controls the polling rate of fetching vouchers

// If running tests on local test env or GitHub CI, use shorter refetch interval to
// prevent tests from taking longer to run
export const REFETCH_GROUP_INTERVAL =
  process.env.NODE_ENV === 'test' || process.env.CI ? 2000 : 20000
export const REFETCH_GROUP_ON_REDEMPTION_PAGE_INTERVAL = 2000
