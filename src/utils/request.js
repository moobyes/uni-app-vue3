/* eslint-disable no-undef */
import signVerify from './signVerify'

const baseUrl = 'https://gateway3.test.m3.m3cube.cn/recv'

export default function request ({method = 'GET', data, formData}) {
  return new Promise((resolve, reject) => {

    // 没有 token，并且不在白名单，不允许请求
    // if (!uni.getStorageSync('uticket')) {
    //   uni.navigateTo({ url: '/pages/public/login' })
    //   return
    // }

    let header = {
      contentType: 'application/json'
    }

    const DEFAULTUTIKET = 'KQshYBQP27UwalA9BodrqU6aW4aGrzaG0eRMhVWLrUPRF4CIV1tHxXv1EC7nP1hD'

    let uticket = uni.getStorageSync('uticket') || DEFAULTUTIKET
    // let currentShop = uni.getStorageSync('currentShop')
    console.log('data :>> ', data);
    data.uticket = uticket || ''
    // data.shopId = data.shopId === 'hide' ? '' : (currentShop.shopId || '')
    let _signVerify = signVerify(data);

    if (formData) {
      headers['Content-type'] = 'application/x-www-form-urlencoded'
    }
    // 发起请求
    // eslint-disable-next-line no-undef
    uni.request({
      url: baseUrl, // 接口url是固定的，通过service区分不同的接口
      data: {...data, ..._signVerify},
      method,
      header,
      success: (response) => {
        if (method === 'GET') {
          resolve(response.data)
          return
        }

        const res = response.data
        // if (loginErrorCode.includes(res.code) || loginErrorSubCode.includes(res.subCode)) {
        //   uni.navigateTo({ url: '/pages/public/Login' })
        //   return
        // }
        resolve(res)
        // uni.navigateTo({ url: '/pages/public/Login' })

        // if (res.code === 10000) {
        //   resolve(res)
        // } else {
        //   resolve({
        //     isError: true,
        //     message: res.message,
        //     subCode: res.subCode
        //   })
        // }
      },
      fail: (e) => {

        uni.navigateTo({ url: '/pages/public/Login' })

        // console.log(` fail:${JSON.stringify(e.data)}`);
      },
      complete: () => { }
    })
  })
}

