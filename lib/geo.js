const com = require('./com')

class geo {
  /**
   * 度分秒 -> 十进制度，结果保留deg的符号，保留5位小数
   * @param {Number} deg 度，可以是负值
   * @param {Number} min 分，负值会取绝对值
   * @param {Number} sec 秒，负值会去绝对值
   * @example (-0, 30, 18) -> 0.505
   */
  static DmsToDegree(deg, min, sec) {
    // 符号和绝对值
    let sign = Math.sign(deg)
    deg = Math.abs(deg)
    min = Math.abs(min)
    sec = Math.abs(sec)

    // 存在非Number类型时返回undefined
    let vals = [sign, deg, min, sec]
    let boolNaN = vals.some(v => Number.isNaN(v))
    if (boolNaN) return

    deg = deg + (min / 60) + (sec / 3600)
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
  static DegreeToDms(decDeg) {
    let deg = Math.trunc(decDeg)
    // 转为Number类型错误时返回undefined
    if (Number.isNaN(deg)) return

    // 考虑负值的情况, -2.2 - (-2) = -0.2
    // decDeg - deg可能出现精度损失，如0.3、0.9等
    let decM = Math.abs(decDeg - deg) * 60
    let min = Math.trunc(decM)
    // sec使用round，尽可能接近原值，可能会产生60
    let sec = Math.round((decM - min) * 60)
    if (sec === 60) {
      min += 1
      sec = 0
    }
    if (min === 60) {
      deg += 1
      min = 0
    }

    return { deg, min, sec }
  }

  /**
   * 获取度分秒字符串
   * @param {Number | Object} dms
   * @example {deg: 116, min: 18, sec: 0} -> 116°18′0″
   */
  static dmsToLabel (dms) {
    if (Number.isFinite(+dms)) {
      dms = this.DegreeToDms(+dms)
    }
    let {deg, min, sec} = dms
    return `${deg}°${min}′${sec}″`
  }

  /**
   * 度分秒字符串转为dms对象，可以识别负号，不能识别小数位
   * @example -116°18′0″ -> {deg: -116, min: 18, sec: 0}
   */
  static labelToDms(str) {
    let reg = /\d+/g
    // 获取数字
    let arr = str.match(reg)
    arr = arr.map(v => +v)
    // 不存在时赋为0
    let deg = arr[0] || 0
    let min = arr[1] || 0
    let sec = arr[2] || 0

    let isNegative = str.startsWith('-')
    if (isNegative) {
      deg = -deg
    }
    return { deg, min, sec }
  }

  /**
   * 度分秒字符串转为十进制度，不能识别小数位
   * @example 116°18′0″ -> 116.3
   */
  static labelToDeg (str) {
    let { deg, min, sec } = this.labelToDms(str)
    return this.DmsToDegree(deg, min, sec)
  }
}

module.exports = geo
