/**
 * 保留指定的位数
 * @param {Number} n 数值
 * @param {Integer} precision 精度
 */
function round(n, precision) {
  return +n.toFixed(precision)
}

module.exports = {
  round
}
