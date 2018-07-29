const isDate = d => d && Object.prototype.toString.call(d) === '[object Date]'
const isValidDate = d => isDate(d) && !isNaN(d)

// 7 -> '07'
/**
 * Pad small number leading zero
 *
 * @param {Number} x - an integer, 0 <= x < 100
 * @returns {string}
 */
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
 * `function OR string` applicator factory
 *
 * if parameter is a function
 *        then applicator acts as function on its arg
 * it parameter is a string
 *        then applicator just returns that string
 *        and disregard its arg.
 */
const makeFunctionOrStringApplicator = fOs => x =>
  typeof fOs === 'function' ? fOs(x) : fOs

/**
 * factory for making format functions
 *
 * @param  {(Function|string)[]} fmt
 *               - a format - an array of date part extractors,
 *                   mixed with string delimeters, e.g.:
 *                   [YYYY, '-', MM, '-', DD]
 *                   here YYYY, MM and DD - functions to extract date parts,
 *                   whereas '-' is a string to be inserted in between
 * @return {Function}
 *               - a formatting function (date => string),
 *                   based on the format given
 */
const makeFormatDate = fmt => d => {
  d = new Date(d)
  if (!isValidDate(d)) return ''

  if (!Array.isArray(fmt)) return `${d}` // toString() is default formatting

  // Apply each `micro` format piece one by one.
  // Here each piece is `function OR string`
  return fmt.reduce(
    (acc, fOs) => acc + makeFunctionOrStringApplicator(fOs)(d),
    ''
  )
}

/**
 * Let's make some particular formatters:
 */

const fmt_Full = [YYYY, '-', MM, '-', DD, ' ', hh, ':', mm, ':', ss]
const fmt_YearMonth = [YYYY, '-', MM]

export const formatDate_Full = makeFormatDate(fmt_Full)
export const formatDate_YearMonth = makeFormatDate(fmt_YearMonth)

/**
 * Make sure the given timestamp is in a numeric format
 *  ( timestamp from ENV VAR comes as string )
 *
 * @param  {string|Number} ts  - a timestamp,
 *           either a number of missiseconds since unix epoch,
 *              1531655957912
 *           or, the same number but in a string form:
 *             '1531655957912'
 * @return {Number}    - timestamp in a numeric form
 */
const normalizeTs = ts => (typeof ts === 'string' ? parseInt(ts, 10) : ts)

/**
 * Formats the timestamp with our particular date formatter
 *
 * Examples:
 *   console.log(formatTimestamp_Full('1531655957912'))
 *   => '2018-07-15 14:59:17'
 *   console.log(formatTimestamp_Full('bad'))
 *   => null
 */
export const formatTimestamp_Full = ts => formatDate_Full(normalizeTs(ts))

export default { formatTimestamp_Full, formatDate_YearMonth }
