<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="正念练习"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">正念练习：旅行手记</view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">1.引发消极情绪的情境是什么?</view>
          <view>{{ content.qingjing }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">2.一开始的情绪是什么样子的?</view>
          <view>{{ content.qingxu }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">3.尝试正念接纳后， 情绪是否有变化?</view>
          <view>{{ content.bianhua }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">4.情绪发生了怎样的变化?</view>
          <view>{{ content.zenyang }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">5.对于整个过程，你的感受是什么?</view>
          <view>{{ content.ganshou }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IZhengnianlianxiReturn } from '@/service/index/zhengnianlianxi'

const content = ref<IZhengnianlianxiReturn>({
  zhengnianId: '',
  userId: '',
  date: '',
  qingjing: '',
  qingxu: '',
  bianhua: '',
  zenyang: '',
  ganshou: '',
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

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.detail-title {
  font-size: 18px;
  font-weight: 900;
}

.box {
  box-sizing: content-box;
  width: 85%;
  height: auto;
  padding: 12px;
  margin: 15px auto;
  border-radius: 10px;
}
</style>
