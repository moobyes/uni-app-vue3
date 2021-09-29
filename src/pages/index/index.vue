<template>
  <view class="content">
    <view @click="testChangeTxt">改变值</view>
    <view>
      <text class="test">{{ title }}, {{ subTitle }}</text>
      <text class="iconfont plus">&#xe642;</text>
      <view class="iconfont icon-jia icon"></view>
    </view>
  </view>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import * as request from '@/utils/request';

export default {
  setup() {
    const subTitle = ref('庆祝');
    const { proxy } = getCurrentInstance();

    console.log('request :>> ', proxy);

    const testChangeTxt = () => {
      subTitle.value = '法律';

      const data = {
        service: 'dish_menus',
        shopId: '870071999',
      };

      request
        .post({
          data,
        })
        .then((res) => {
          console.log('res :>> ', res);
        })
        .catch((err) => {
          console.log('err :>> ', err);
        });
    };
    return {
      title: subTitle,
      subTitle,
      testChangeTxt,
    };
  },
};
</script>

<style lang="scss">
.test {
  color: $uni-color-primary;
}
.plus {
  color: rgb(255, 160, 51);
}
.icon {
  width: 36upx;
  height: 36upx;
  font-size: 26upx;
}
.wrapHeight {
  width: calc(100upx - 10upx);
}
</style>
