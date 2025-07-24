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
      title="接纳练习"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="title">一封给你的信</view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">给：</view>
          <view>{{ content.name }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我知道，当：</view>
          <view>{{ content.qingjing }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">你会感觉：</view>
          <view>{{ content.ganshou }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">你会：</view>
          <view>{{ content.xingdong }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">然而，我知道：</view>
          <view>{{ content.zhidao }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我想告诉你：</view>
          <view>{{ content.gaosu }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IJienalianxiReturn } from '@/service/index/jienalianxi'

const content = ref<IJienalianxiReturn>({
  jienaId: '',
  userId: '',
  name: '',
  date: '',
  qingjing: '',
  ganshou: '',
  xingdong: '',
  zhidao: '',
  gaosu: '',
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

.title {
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
