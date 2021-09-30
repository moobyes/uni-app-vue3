/* eslint-disable no-undef */
import signVerify from './signVerify';
import { showError } from './utils';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://gateway3.test.m3.m3cube.cn/recv'
    : 'https://gateway-bar.cubem3.cn/recv';

function baseRequest({ method = 'GET', data, url = baseUrl, formData }) {
  return new Promise((resolve, reject) => {
    // 没有 token，并且不在白名单，不允许请求
    // if (!uni.getStorageSync('uticket')) {
    //   uni.navigateTo({ url: '/pages/public/login' })
    //   return
    // }

    uni.showLoading({
      title: '加载中',
    });

    let header = {
      'Content-Type': 'application/json',
    };

    const DEFAULTUTIKET = 'KQshYBQP27UwalA9BodrqU6aW4aGrzaG0eRMhVWLrUPRF4CIV1tHxXv1EC7nP1hD';

    let uticket = uni.getStorageSync('uticket') || DEFAULTUTIKET;
    // let currentShop = uni.getStorageSync('currentShop')

    data.uticket = uticket || '';
    // data.shopId = data.shopId === 'hide' ? '' : (currentShop.shopId || '')
    let _signVerify = signVerify(data);

    if (formData) {
      headers['Content-type'] = 'application/x-www-form-urlencoded';
    }
    // 发起请求
    uni.request({
      url, // 接口url是固定的，通过service区分不同的接口
      data: { ...data, ..._signVerify },
      method,
      header,
      success: (response) => {
        uni.hideLoading();

        const { state, data, errMsg } = response;

        if (+state === 200) {
          resolve(data);
        } else {
          showError(errMsg || '服务器错误，稍后再试');
        }
      },
      fail: (e) => {
        uni.hideLoading();

        if (e && e.response) {
          showError(error.response);
        }

        // uni.navigateTo({ url: '/pages/public/Login', })
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  });
}

/**
 * get
 * @param opts
 * @returns {Promise}
 */
const get = async (opts) => baseRequest({ method: 'GET', ...opts });

/**
 * post
 * @param opts
 * @returns {Promise}
 */
const post = async (opts) =>
  baseRequest({
    method: 'POST',
    ...opts,
  });

/**
 * put
 * @param opts
 * @returns {Promise}
 */
const put = async (opts) =>
  baseRequest({
    method: 'POST',
    ...opts,
  });

/**
 * delete
 * @param opts
 * @returns {Promise}
 */
const del = async (url, data = '') =>
  baseRequest({
    method: 'DELETE',
    ...opts,
  });

export { get, post, put, del };
