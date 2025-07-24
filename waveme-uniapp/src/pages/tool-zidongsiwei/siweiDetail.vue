<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="自动思维"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">情境：</view>
          <view>{{ content.qingjing }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">感受：</view>
          <view>{{ content.ganshou }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">自动思维：</view>
          <view>{{ content.zidongsiwei }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">后续影响：</view>
          <view>{{ content.houxuyingxiang }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">如何识别：</view>
          <view>{{ content.ruheshibie }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IZidongsiweiReturn } from '@/service/index/zidongsiwei'

const content = ref<IZidongsiweiReturn>({
  siweiId: '',
  userId: '',
  date: '',
  qingjing: '',
  ganshou: '',
  zidongsiwei: '',
  houxuyingxiang: '',
  siweiName: '',
  monsterUrl: '',
  ruheshibie: '',
  recordId: -1,
})
onLoad((options) => {
  content.value = JSON.parse(decodeURIComponent(options.detail))
  console.log(content.value)
})

const goBack = () => {
  uni.navigateBack()
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.box {
  box-sizing: content-box;
  width: 85%;
  height: auto;
  padding: 12px;
  margin: 15px auto;
  border-radius: 10px;
}

.detail-title {
  font-size: 18px;
  font-weight: 900;
}
</style>
