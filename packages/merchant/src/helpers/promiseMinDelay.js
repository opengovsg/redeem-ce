// Quick own implmentation of a minimum promise delayer
// Did not use a package becaue there was a js error encountered with the 'p-min-delay'
// package. TypeError: Promise[delayRejection ? 'allSettled' : 'all'] is not a function.
// This seemed to be react native specific

export default function promiseMinDelay(promise, minimumDelayInMs) {
  const promiseStartTimestamp = Date.now()
  return new Promise((resolve, reject) => {
    promise
      .then((res) => {
        resolveWithMinDelay(res, resolve, promiseStartTimestamp, minimumDelayInMs)
      })
      .catch((err) => {
        resolveWithMinDelay(err, reject, promiseStartTimestamp, minimumDelayInMs)
      })
  })
}

function resolveWithMinDelay(result, resolver, startTimestamp, minimumDelayInMs) {
  const promiseResolveTimestamp = Date.now()
  const elapsedTimeInMs = promiseResolveTimestamp - startTimestamp
  // If elapsed time is sufficent already, then resolve immediately
  // Else, set a timeout to resolve in the future
  if (elapsedTimeInMs >= minimumDelayInMs) {
    resolver(result)
  } else {
    const remainingTimeToWaitInMs = minimumDelayInMs - elapsedTimeInMs
    setTimeout(() => resolver(result), remainingTimeToWaitInMs)
  }
}
