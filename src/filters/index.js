/**
 * Created by leibo on 17/11/13.
 */
//获取日期 格式年-月-日
// export const getNewDate = (value) => {
// 	let reg = /\d+/g
// 	if (value) {
// 		var num = value.match(reg)[0];
// 		var date = new Date(Number(num));
// 		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
// 	}
//
// };
//补0
function getNum(num) {
	return num < 10 ? '0' + num : '' + num
}
//时间
// export const getUseTime = val => {
// 	let date = new Date()
// 	if (!val) {
// 		return date.getFullYear() + '-' + getNum((date.getMonth() + 1)) + '-' + getNum(date.getDate()) + ' ' + getNum(date.getHours()) +
// 			':' + getNum(date.getMinutes()) + ':' + getNum(date.getSeconds())
// 	} else {
// 		if (!val.includes('.')) {
// 			return val.replace(/T/, ' ')
// 		} else {
// 			return val.substring(0, val.indexOf('.')).replace(/T/, ' ')
// 		}
// 	}
// };

//获取早中晚
// export const getUseType = val => {
// 	switch (Number(val)) {
// 		case 0:
// 			return '早餐';
// 		case 1:
// 			return '中餐';
// 		case 2:
// 			return '晚餐';
// 		default:
// 			return '其他';
// 	}
// }
//转换时间戳
export const getAddTime = val => {
	let t = new Date(Number(val));
	return t.getFullYear() + '-' + getNum(t.getMonth() + 1) + '-' + getNum(t.getDate());
}
