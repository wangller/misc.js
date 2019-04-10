class com {
  /**
   * 保留指定的位数
   * @param {Number} n 数值
   * @param {Integer} precision 精度
   */
  static round(n, precision) {
    return +n.toFixed(precision)
  }

  /**
   * 数组去重
   */
  static uniq(arr) {
    let obj = {}
    let i = arr.length

    for (i; i >= 0; i--) {
      let elem = arr[i]
      if (elem in obj) {
        arr.splice(i, 1)
      } else {
        obj[elem] = true
      }
    }
    return arr
  }

  /**
   * 数组元素统计
   */
  static countBy(arr) {
    let obj = {}
    let i = 0
    let l = arr.length

    for (i; i < l; i++) {
      let elem = arr[i]
      obj[elem] = (obj[elem] || 0) + 1
    }
    return obj
  }

  /**
   * 转为一维数组
   */
  static flatten(arr) {
    if (!Array.isArray(arr)) {
      return [arr]
    }

    let newArr = []
    let i = 0
    let l = arr.length

    for (i; i < l; i++) {
      let elem = arr[i]
      if (Array.isArray(elem)) {
        let temp = this.flatten(elem)
        newArr.push(...temp)
      } else {
        newArr.push(elem)
      }
    }
    return newArr
  }
}

module.exports = com
