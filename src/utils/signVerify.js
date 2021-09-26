// eslint-disable-next-line import/extensions
import md5 from './md5.min.js';

const guid = () => 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  // eslint-disable-next-line no-bitwise
  let r = (Math.random() * 16) | 0;
  // eslint-disable-next-line no-bitwise
  let v = c === 'x' ? r : (r & 0x3) | 0x8;
  return v.toString(16);
})
const MD5StringMake = (list) => {
  let arr = [];

  Object.keys(list).forEach((key) => {
    arr.push(key);
  })
  arr = arr.sort();
  let str = '';
  arr.forEach((key) => {

    let value = list[key];
    // console.log(key+":"+value)

    if (value != null) {
      if (key !== 'osskeyList' && key !== 'rentAmounts' && key !== 'posAddTransList') {
        if (typeof value === 'string') {
          if (value.length > 0) {
            str += `${key}=${list[key]}&`;
          }
        } else {
          str += `${key}=${list[key]}&`;
        }
      }
    }
  })
  str = str.substr(0, str.length - 1);
  //  console.log(str)
  // console.log(md5(str))
  return md5(str);
}
const filterCollection = (params) => { /* 集合数据类型不参与验签 */
  let _keys = Object.keys(params).filter((val) => {
    let _ = (typeof params[val]) === 'object' && params[val] != null;
    return !(_ || Array.isArray(params[val]));
  })
  let _params = {}
  _keys.forEach((key, val) => {
    _params[key] = params[key];
  })
  return _params;
}

const signVerify = (params) => {
  let _params = {
    signType: 'MD5',
    pid: '2',
    requestTime: new Date().getTime(),
    symbol: guid()
  }

  params = filterCollection(params)
  let _sign = Object.assign(params, _params)
  let sign = MD5StringMake(_sign)
  return {..._params, sign: sign}
}
export default signVerify;
