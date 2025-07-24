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
      title="应对计划"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">坏情绪应对计划</view>
      <view class="box-top">
        <view style="font-size: 20px; font-weight: bold">{{ content.date }}</view>
        <view style="font-size: 20px; font-weight: bold">{{ content.jihuaName }}</view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">给你的应对计划起个名字：</view>
          <view>{{ content.jihuaName }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">
            1
            触发情境：什么时刻、发生什么事情可能会让你陷入糟糕的情绪状态？这可能不是一个具体的事情，而是一类相似的情境，想一想，写下来
          </view>
          <view>{{ content.qingjing }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">
            2
            惯常的应对策略：当糟糕的消极情绪产生，你最有可能采取什么样的应对行为？可以想想第四站里你在回避档案里写下的那些，也可以重新总结
          </view>
          <view>{{ content.celue }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="detail-title">
            3 新的替代反应：
            你打算运用哪些新技能来代替上面的惯常应对策略？可以从短期和长期两个角度来思考：当你有糟糕感受的时候，有什么你立刻就能做并且可以起作用的？在平时，有哪些技能可以被发展为习惯，从而对你产生长期帮助？
          </view>
          <view>{{ content.duanqi }}</view>
          <view>{{ content.changqi }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IYingduijihuahuaReturn } from '@/service/index/yingduijihua'

const content = ref<IYingduijihuahuaReturn>({
  yingduiId: '',
  userId: '',
  date: '',
  jihuaName: '',
  qingjing: '',
  celue: '',
  duanqi: '',
  changqi: '',
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
