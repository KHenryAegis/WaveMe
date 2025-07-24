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
      <view class="font">我的魔法行动指南</view>
      <view class="box-top">
        <view style="font-size: 20px; font-weight: bold">{{ content.date }}</view>
        <view style="font-size: 20px; font-weight: bold">{{ content.jihuaName }}</view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我想要改变的一个生活领域：</view>
          <view>{{ content.lingyu }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">在这个生活领域里，我的价值是：</view>
          <view>{{ content.jiazhi }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">我的价值意图：</view>
          <view>{{ content.yitu }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">
            在你所选择的生活领域里，基于你想追求的价值和价值意图，你的目标是什么？
          </view>
          <view>{{ content.mubiao }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">针对你的目标，你所能做的最小、最简单的一步是什么？</view>
          <view>{{ content.xingdong }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">你打算什么时候开始做？请输入一个尽量准确的时间：</view>
          <view>{{ content.xingdongTime }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">你觉得你遇到的障碍可能是什么？</view>
          <view>{{ content.zhangai }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">如果这个障碍真的发生了，你打算如何应对（越具体越好）</view>
          <view>{{ content.yingdui }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IXingdongjihuaReturn } from '@/service/index/xingdongjihua'

const content = ref<IXingdongjihuaReturn>({
  xingdongId: '',
  userId: '',
  date: '',
  jihuaName: '',
  lingyu: '',
  jiazhi: '',
  yitu: '',
  mubiao: '',
  xingdong: '',
  xingdongTime: '',
  zhangai: '',
  yingdui: '',
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

.box-top {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: auto;
  padding: 12px 25px 12px 25px;
  margin: 15px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
}
</style>
