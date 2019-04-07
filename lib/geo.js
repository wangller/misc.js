const R = require('ramda')
const com = require('./com')

/**
 * 度分秒 -> 十进制度，结果保留deg的符号，保留5位小数
 * @param {Number} deg 度，可以是负值
 * @param {Number} min 分，负值会取绝对值
 * @param {Number} sec 秒，负值会去绝对值
 * @example (-0, 30, 18) -> 0.505
 */
function DmsToDegree(deg, min, sec) {
  // 符号和绝对值
  let sign = Math.sign(deg)
  deg = Math.abs(deg)
  min = Math.abs(min)
  sec = Math.abs(sec)

  // 存在非Number类型时返回undefined
  let vals = [sign, deg, min, sec]
  let boolNaN = vals.some(v => Number.isNaN(v))
  if (boolNaN) return

  deg = deg + R.divide(min, 60) + R.divide(sec, 3600)
  deg = com.round(deg, 5)
  // 保留deg的符号
  let boolPositive = Object.is(sign, 0) || Object.is(sign, 1)
  return boolPositive ? deg : -deg
}

/**
 * 十进制度 -> 度分秒，支持负值
 * @param {Number} decDeg 十进制度，可以是负值
 * @returns {Object} {deg, min, sec}
 * @example -0.505 -> {deg: -0, min: 30, sec: 18}
 */
function DegreeToDms(decDeg) {
  let deg = Math.trunc(decDeg)
  // 转为Number类型错误时返回undefined
  if (Number.isNaN(deg)) return

  // 考虑负值的情况, -2.2 - (-2) = -0.2
  let decM = Math.abs(decDeg - deg)
  let min = Math.trunc(decM * 60)
  // sec使用round，尽可能接近原值
  let sec = Math.round((decM - min) * 60)
  return { deg, min, sec }
}

module.exports = {
  DmsToDegree,
  DegreeToDms
}
