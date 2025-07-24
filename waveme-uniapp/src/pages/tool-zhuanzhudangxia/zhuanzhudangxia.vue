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
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="专注当下" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view style="height: 15%"></view>

    <view class="big-icon">
      <img
        style="width: 200px; height: 180px"
        src="http://115.159.83.61:9000/tool/zhuanzhudangxia/zhuanzhudangxia-logo.png"
      />
    </view>
    <view class="title">专注当下</view>
    <view class="font">专注当下，觉知你的每一刻</view>
    <view class="small-font">下面两个正念练习将帮助你回到此时此刻</view>
    <view>
      <wd-card>
        <view class="card-content" @click="toBreath">
          <view class="card-title">正念呼吸</view>
          <view><wd-icon name="chart-bubble" size="26px"></wd-icon></view>
        </view>
      </wd-card>
      <wd-card>
        <view class="card-content" @click="ToScan">
          <view class="card-title">身体扫描</view>
          <view><wd-icon name="user" size="26px"></wd-icon></view>
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

const toBreath = () => {
  uni.navigateTo({
    url: '/pages/tool-zhuanzhudangxia/breath',
  })
}

const ToScan = () => {
  uni.navigateTo({
    url: '/pages/tool-zhuanzhudangxia/scan',
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

.small-font {
  margin-top: 12px;
  font-size: 14px;
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
