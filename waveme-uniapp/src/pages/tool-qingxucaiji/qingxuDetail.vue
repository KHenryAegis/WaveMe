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
      <view class="title">情绪采集手册</view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">你此刻感觉怎么样？</view>
          <view>{{ content.feelingName }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">这种情绪的认知成分是：</view>
          <view>{{ content.renzhi }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">这种情绪的行为成分是：</view>
          <view>{{ content.xingwei }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">这种情绪的生理成分是：</view>
          <view>{{ content.shengli }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">发生了什么使得我产生了这种情绪？</view>
          <view>{{ content.chansheng }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我是怎么应对这种情绪的？</view>
          <view>{{ content.yingdui }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">这种应对方式起效了吗？</view>
          <view>{{ content.qixiao }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IQingxucaijiReturn } from '@/service/index/qingxucaiji'

const content = ref<IQingxucaijiReturn>({
  qingxuId: '',
  userId: '',
  date: '',
  feelingUrl: '',
  feelingName: '',
  renzhi: '',
  xingwei: '',
  shengli: '',
  chansheng: '',
  yingdui: '',
  qixiao: '',
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
  font-size: 18px;
  font-weight: bold;
  text-align: center;
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
