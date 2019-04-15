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
   * 判断数据类型
   * @param {String} type 首字母大写
   */
  static isType(val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }

  /**
   * 数组、对象的深拷贝
   */
  static deepCopy(source) {
    let tar

    if (Array.isArray(source)) {
      tar = []
      let i = 0
      let len = source.length
      for (i; i < len; i++) {
        tar.push(this.deepCopy(source[i]))
      }
    } else if (this.isType(source, 'Object')) {
      tar = {}
      for (let k in source) {
        tar[k] = this.deepCopy(source[k])
      }
    } else {
      tar = source
    }
    
    return tar
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

  /**
   * 快速排序
   */
  static quickSort (arr) {
    arr = []
    let len = arr.length
    if (len <= 1) return arr

    // 找到中间点并删除
    let pivotIdx = Math.floor(len / 2)
    let pivot = arr[pivotIdx]
    arr.splice(pivotIdx, 1)

    let left = []
    let right = []
    arr.forEach(v => {
      if (v < pivot) {
        left.push(v)
      } else {
        right.push(v)
      }
    })

    return this.quickSort(left).concat(pivot, this.quickSort(right))
  }
}

module.exports = com
