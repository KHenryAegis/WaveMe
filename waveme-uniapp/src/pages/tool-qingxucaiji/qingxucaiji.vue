<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '心情日记',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="情绪采集" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view style="height: 15%"></view>
    <view class="big-icon">
      <img
        style="width: 200px; height: 180px"
        src="http://115.159.83.61:9000/tool/qingxucaiji/qingxucaiji-logo.png"
      />
    </view>
    <view class="title">情绪采集</view>
    <view class="font">采集情绪，分析成分，觉察应对模式</view>
    <view>
      <wd-card>
        <view class="card-content" @click="start">
          <view class="card-title">开始记录</view>
          <view><wd-icon name="edit-1" size="26px" /></view>
        </view>
      </wd-card>
      <wd-card>
        <view class="card-content" @click="ToList">
          <view class="card-title">查看手册</view>
          <view><wd-icon name="copy" size="26px" /></view>
        </view>
      </wd-card>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const handleClickLeft = () => {
  uni.navigateBack()
}

const start = () => {
  uni.navigateTo({
    url: '/pages/tool-qingxucaiji/input',
  })
}

const ToList = () => {
  uni.navigateTo({
    url: '/pages/tool-qingxucaiji/list',
  })
}
</script>

<style>
.font {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.title {
  margin-top: 12px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.big-icon {
  display: flex;
  justify-content: center;
  margin-top: 20%;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 20px;
  color: black;
}
</style>
