<template>
    <view class="content">
        <view @click="testChangeTxt">改变值</view>
        <view>
            <text class="title">{{title}}, {{subTitle}}</text>
        </view>
    </view>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import request from '../../utils/request'

export default {
  setup() {
    const subTitle = ref('庆祝')
    const { proxy } = getCurrentInstance()

    console.log('request :>> ', request, proxy);

    const testChangeTxt = () => {
      subTitle.value = '法律';

      // const data = {
      //   service: 'dish_menus',
      //   shopId: '870071999'
      // }
      // request({
      //   method: 'POST',
      //   data
      // }).then((res) => {
      //   console.log('res :>> ', res);
      // }).catch((err) => {
      //   console.log('err :>> ', err);
      // })
    };
    return {
      title: subTitle,
      subTitle,
      testChangeTxt
    };
  }
};
</script>

<style>
    .content {
        text-align: center;
        height: 400upx;
    }

    .logo {
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }

    .title {
        font-size: 36upx;
        color: #8f8f94;
    }
</style>
