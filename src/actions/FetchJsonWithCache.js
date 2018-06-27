const DEFAULT_TTL = 3600000 // 1 hour in milliseconds

/**
 * A factory to produce a fetcher function
 * with cache layer and expiration
 *
 * @param  {Number} ttl  Time to live in milliseconds -
 *                         expiration duration for a cached value
 * @return {Function}    fetcher function with cache and ttl
 *                         embedded through a closer
 */
function makeFetchJsonWithCache(ttl) {
  typeof ttl === 'number' || (ttl = DEFAULT_TTL)

  const cache = new Map()

  return async function fetchJsonWithCache(path) {
    let cached = cache.get(path)
    let value

    if (
      // cache for this path is found
      cached &&
      cached.timestamp &&
      // and is not expired
      Date.now() - cached.timestamp < ttl
    ) {
      // use cached value
      value = cached.value
    } else {
      // have to do a real fetch
      value = fetchJson(path)

      // save to cache
      cache.set(path, { value, timestamp: Date.now() })
    }

    return value
  }
}

async function fetchJson(path) {
  const response = await fetch(path)
  const value = await response.json()
  return value
}

export default makeFetchJsonWithCache
