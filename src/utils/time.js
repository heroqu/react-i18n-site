// 7 -> '07'
const PAD2 = x => (x + 100).toString().slice(-2)

// Date part extractors

const YYYY = d => d.getFullYear().toString()
const MM = d => PAD2(d.getMonth() + 1)
const DD = d => PAD2(d.getDate())

const hh = d => PAD2(d.getHours())
const mm = d => PAD2(d.getMinutes())
const ss = d => PAD2(d.getSeconds())

// `Function OR String` applicator
const FN_or_STR = f => x => (typeof f === 'function' ? f(x) : f)

export const dateFullFormat = d =>
  [YYYY, '-', MM, '-', DD, ' ', hh, ':', mm, ':', ss].reduce(
    (acc, f) => acc + FN_or_STR(f)(d),
    ''
  )

export const timestampFullFormat = ts => dateFullFormat(new Date(ts))

export default {
  dateFullFormat,
  timestampFullFormat
}

// console.log(TimestampFullFormat(Date.now()))
// =>
// 2018-07-11 22:08:04
