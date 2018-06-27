const DEFAULT_TTL = 3600000 // 1 hour in milliseconds

/**
 * A factory that produce a fetcher function
 * with cache layer and expiration
 *
 * @param  {Number}     Time to live in milliseconds -
 *                         expiration duration for a cached value
 * @return {Function}   fetcher function with cache and ttl
 *                         embedded through a closer
 */
function makeFetchJsonWithCache(ttl) {
  typeof ttl === 'number' || (ttl = DEFAULT_TTL)

  const cache = new Map()
  let fetchCount = 0

  return async function fetchJsonWithCache(path) {
    let cached = cache.get(path)
    let value

    fetchCount++

    console.log(`fetchJsonWithCache: count: ${fetchCount}`)

    if (
      // cache for this path is found
      cached &&
      cached.timestamp &&
      // and is not expired
      Date.now() - cached.timestamp < ttl
    ) {
      // use cached value
      value = cached.value

      console.log(`_____ fetchJsonWithCache: RETURN (cached): value:`)
      console.log(value)

      return value
    }

    console.log(`_____ fetchJsonWithCache: cache:`)
    console.log(cache)
    console.log(`_____ fetchJsonWithCache: REAL fetch for path: ${path}`)

    // have to do a real fetch
    // const response = await fetch(path)
    // const value = await response.json()

    value = fetchJson(path)

    // save to cache
    cache.set(path, { value, timestamp: Date.now() })

    console.log(`_____ fetchJsonWithCache: RETURN: (fetched) value:`)
    console.log(value)

    return value
  }
}

async function fetchJson(path) {
  const response = await fetch(path)
  const value = await response.json()
  return value
}

export default makeFetchJsonWithCache
