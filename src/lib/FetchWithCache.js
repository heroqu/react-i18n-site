/**
 * Wrap a cache layer around fetching function
 *
 * @param  {number} ttl       - cache Time to Live in milliseconds
 * @param  {Function} fecther - function to fetch data,
 *                                should return a promise
 * @return {Promise({ value: any, timestamp: number, isNew: boolean })}
 *                            - promise of received data + ts + isNew flag
 */
export default function FetchWithCache(fecther, ttl) {
  if (typeof fecther !== 'function') {
    throw new Error('FetchWithCache: fecher must be a function')
  }

  typeof ttl !== 'number' && (ttl = 3600000) // 1 hour default

  let value
  let timestamp

  const isExpired = () =>
    // if never fetched
    typeof timestamp !== 'number' ||
    // or, if TTL is exceeded
    Date.now() > timestamp + ttl

  return async () => {
    let isNew = false
    if (isExpired()) {
      try {
        value = await fecther()
        timestamp = Date.now()
        isNew = true
      } catch (e) {
        console.error('Error fetching data', e)
        // and now just return older data
      }
    }

    return { value, timestamp, isNew }
  }
}
