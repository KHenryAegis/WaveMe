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
      title="价值手册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">我的价值手册</view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我的生活领域：</view>
          <view>{{ content.lingyu }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我的价值：</view>
          <view>{{ content.miaoshu }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我的意图：</view>
          <view>{{ content.yitu }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我正在做对我来说重要的事情吗？</view>
          <view>{{ content.pingjia }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">是什么鼓励了我，又是什么阻碍了我？</view>
          <view>{{ content.shiqing }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IJiazhishouceReturn } from '@/service/index/jiazhishouce'

const content = ref<IJiazhishouceReturn>({
  jiazhiId: '',
  userId: '',
  date: '',
  lingyu: '',
  miaoshu: '',
  yitu: '',
  pingjia: '',
  shiqing: '',
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
