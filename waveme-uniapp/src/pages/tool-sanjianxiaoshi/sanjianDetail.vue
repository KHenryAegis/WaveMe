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
    <wd-navbar fixed safeAreaInsetTop left-text="返回" left-arrow @click-left="goBack"></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="title-container">
        <view>
          <img :src="content.statusUrl" style="width: 50px; height: 50px" />
        </view>
        <view class="title-sub-container">
          <view class="title">三件小事</view>
          <view>{{ content.date }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">第一件事：</view>
          <view>{{ content.one }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">第二件事：</view>
          <view>{{ content.two }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">第三件事：</view>
          <view>{{ content.three }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { ISanjianxiaoshiReturn } from '@/service/index/sanjianxiaoshi'

const content = ref<ISanjianxiaoshiReturn>({
  sanjianId: '',
  userId: '',
  date: '',
  statusUrl: '',
  one: '',
  two: '',
  three: '',
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
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
}

.title-sub-container {
  display: flex;
  flex-direction: column;
}

.detail-title {
  font-size: 18px;
  font-weight: 900;
}

.title {
  margin-top: 12px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
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
