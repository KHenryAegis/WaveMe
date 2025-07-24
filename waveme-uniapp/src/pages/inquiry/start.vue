<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '打卡',
  },
  needLogin: true,
}
</route>

<template>
  <view class="" w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="打卡"></wd-navbar>

    <view class="con px-2">
      <view style="height: 15%"></view>

      <view class="illustration-placeholder">
        <img src="http://115.159.83.61:9000/inquiry/wenjuan.png" alt="" />
      </view>

      <view class="instructions">
        <p class="text-xl font-800">填写问卷，完成打卡，记录你的改变！</p>
        <p class="text-xl font-800">中途请不要退出</p>
      </view>

      <!-- <button class="start-button" @click="startInquiry">开始填写</button> -->
      <view class="flex justify-center">
        <wd-button @click="startInquiry" type="success" size="large">开始填写</wd-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useInterStore } from '@/store/inter'
import { useToast } from 'wot-design-uni'

const interStore = useInterStore()
const interId = interStore.interInfo.interId
// 这里可以添加任何需要的逻辑
const startInquiry = () => {
  // 测试阶段跳过问卷
  // uni.navigateTo({
  //   url: '/pages/inquiry/inquiry?position=' + interId + '-post',
  // })
  uni.redirectTo({
    url: '/pages/inquiry/eval',
  })
}
</script>

<style scoped>
.con {
  display: flex;
  flex: 1;
  flex-direction: column;
  /* gap: 15px; */
  height: 100vh;
  overflow: hidden;
  /* padding-top: 1.25rem;
  margin-top: 3rem; */
  /* overflow-y: scroll; */
  background: linear-gradient(90deg, rgba(171, 236, 214, 0.29) 0%, rgba(251, 237, 150, 0.29) 100%);
}
.container {
  max-width: 400px;
  height: 100vh;
  /* padding: 20px; */
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #e8f5e9;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-arrow {
  margin-right: 10px;
  font-size: 24px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.illustration {
  margin-bottom: 20px;
}

.illustration-placeholder {
  width: 100%;
  height: 400px;
  /* background-color: #c8e6c9; */
  border-radius: 10px;
}

.instructions {
  margin-bottom: 20px;
  text-align: center;
}

.instructions p {
  margin: 5px 0;
  font-size: 14px;
}

.start-button {
  display: block;
  width: 60%;
  padding: 12px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
}

.start-button:hover {
  background-color: #45a049;
}
</style>
