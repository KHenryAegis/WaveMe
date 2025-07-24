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
    class="overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="心情日记" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="big-icon">
      <img
        style="width: 200px; height: 180px"
        src="http://115.159.83.61:9000/tool/moodDiary/diary-logo.png"
      />
    </view>
    <view class="title">心情日记</view>
    <view class="font">觉察你的此时此刻，记录你的每日情绪</view>
    <view>
      <wd-card>
        <view class="card-content" @click="startRecord">
          <view class="card-title">开始记录</view>
          <view><wd-icon name="edit-1" size="26px" /></view>
        </view>
      </wd-card>
      <wd-card>
        <view class="card-content" @click="ToDiaryList">
          <view class="card-title">查看日记</view>
          <view><wd-icon name="copy" size="26px" /></view>
        </view>
      </wd-card>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'mood',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const handleClickLeft = () => {
  uni.navigateBack()
}

const startRecord = () => {
  uni.navigateTo({
    url: '/pages/feeling/feeling',
  })
}

const ToDiaryList = () => {
  uni.navigateTo({
    url: '/pages/diaryList/diaryList',
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.font {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.bg {
  background: linear-gradient(
    180deg,
    rgba(255, 221, 225, 0.67) 0%,
    rgba(242, 222, 213, 0.3) 41.21%,
    rgba(255, 252, 219, 0.67) 100%
  );
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
