const isValidDate = d =>
  d && Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d)

// 7 -> '07'
const PAD2 = x => (x + 100).toString().slice(-2)

/**
 *  Date part extractors
 */

const YYYY = d => d.getFullYear().toString()
const MM = d => PAD2(d.getMonth() + 1)
const DD = d => PAD2(d.getDate())

const hh = d => PAD2(d.getHours())
const mm = d => PAD2(d.getMinutes())
const ss = d => PAD2(d.getSeconds())

/**
 * `function OR string` applicator
 * if it's a function then apply it as function on arg
 * it is's a string then use it as is
 */
const applyFOS = fOs => x => (typeof fOs === 'function' ? fOs(x) : fOs)

/**
 * Formats the date as 'YYYY-MM-DD HH:mm:ss'
 *
 * @param  {any} d  - a valid date or enything else
 * @return {String|Null}  a formatted date or Null, if date is invalid
 */
const ourDateFormatter = d =>
  isValidDate(d)
    ? [YYYY, '-', MM, '-', DD, ' ', hh, ':', mm, ':', ss].reduce(
        (acc, f) => acc + applyFOS(f)(d),
        ''
      )
    : null

/**
 * parse timestamp from ENV VAR (which is therefore a string)
 *        into a JavaScript Date
 *
 * @param  {String} ts - a string containing the number of missiseconds
 *                        since unix epoch, e.g.: '1531655957912'
 * @return {Date}    - date, either valid or not, depending on parsing success
 */
const ts2Date = ts => new Date(parseInt(ts, 10))

/**
 * Formats the timestamp with our particular date formatter
 *
 * Examples:
 *   console.log(tsFormatter('1531655957912'))
 *   => '2018-07-15 14:59:17'
 *   console.log(tsFormatter('bad'))
 *   => null
 */
export const tsFormatter = ts => ourDateFormatter(ts2Date(ts))

export default { tsFormatter }
