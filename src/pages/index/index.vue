<template>
  <view class="content">
    <uni-nav-bar
      left-icon="back"
      left-text="返回"
      right-text="菜单"
      title="导航栏组件"
    />
    <view @click="testChangeTxt">
      改变值
    </view>
    <view>
      <text class="test">
        {{ title }}, {{ subTitle }}
      </text>
      <i class=".t-icon t-icon-diandan" />
      <view class="iconfont icon-jia icon" />
    </view>
  </view>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import * as request from '@/utils/request';

export default {
  components: {
    uniNavBar,
  },
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
