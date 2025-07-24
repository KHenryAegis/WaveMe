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
    <wd-navbar fixed safeAreaInsetTop title="站前测量" left-arrow @click-left="ToHome"></wd-navbar>

    <view class="main-container">
      <view class="card">
        <image class="illustration" :src="imageMap.get(progress)" mode="aspectFit"></image>
        <view class="title">上一站旅程反馈</view>

        <view class="questions flex justify-center" v-for="(question, index) in qs" :key="index">
          <view class="question">{{ question }}</view>
        </view>

        <!-- <button class="start-button" @click="startJourney">开始旅程</button> -->
        <view class="flex justify-center">
          <wd-button type="success" size="large" @click="startBefore">开始反馈</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { startInter, IStartInter } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { useMessage, useToast } from 'wot-design-uni'

const userStore = useUserStore()
const globalPageControl = useGlobalPageControlStore()
const interStore = useInterStore()
const progress = ref<number>()
const toast = useToast()

// onMounted(() => {
//   currContent.value = pageContent.value[progress.value]
// })

onLoad((options) => {
  const numberStr = options.progress
  console.log('当前进入第几站：', numberStr)
  progress.value = Number(decodeURIComponent(numberStr))
  progress.value %= 8
  console.log(progress.value)
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const stationMap = new Map([
  [0, '我的旅程: 导入'],
  [1, '我的旅程: 第一站'],
  [2, '我的旅程: 第二站'],
  [3, '我的旅程: 第三站'],
  [4, '我的旅程: 第四站'],
  [5, '我的旅程: 第五站'],
  [6, '我的旅程: 第六站'],
  [7, '我的旅程: 第七站'],
])

const navbarTitle = ref<string>('')

const { safeAreaInsets } = uni.getSystemInfoSync()
const imageMap = new Map([
  [0, 'http://115.159.83.61:9000/common/before.png'],
  [1, 'http://115.159.83.61:9000/common/before.png'],
  [2, 'http://115.159.83.61:9000/common/before.png'],
  [3, 'http://115.159.83.61:9000/common/before.png'],
  [4, 'http://115.159.83.61:9000/common/before.png'],
  [5, 'http://115.159.83.61:9000/common/before.png'],
  [6, 'http://115.159.83.61:9000/common/before.png'],
  [7, 'http://115.159.83.61:9000/common/before.png'],
])
const currContent = ref()

const qs = ref(['上一站旅程对你是否有帮助？', '为了帮助我们做的更好，', '期待您的反馈！'])

// const pageContent = ref([
//   {
//     questions: ['上一站旅程对你是否有帮助？', '为了帮助我们做的更好，', '期待您的反馈！'],
//   },
// ])
const startBefore = async () => {
  uni.redirectTo({
    url:
      '/pages/inquiry/inquiry?position=' + encodeURIComponent(progress.value.toString()) + '-pre',
  })
}
</script>

<style>
.main-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.card {
  width: 90%;
  max-width: 400px;
  padding: 30px;
  /* background-color: #ffffff; */
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.illustration {
  display: block;
  width: 600rpx;
  height: 600rpx;
  margin: 0 auto;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.questions {
  margin-bottom: 30px;
}

.question {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}

.start-button {
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 25px;
}
</style>
