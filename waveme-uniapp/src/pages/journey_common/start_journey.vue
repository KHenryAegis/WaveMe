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
      :title="navbarTitle"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container" v-if="currContent">
      <view class="card">
        <image class="illustration" :src="imageMap.get(progress)" mode="aspectFit"></image>
        <view class="title">{{ currContent.title }}</view>

        <view class="questions" v-for="(question, index) in currContent.questions" :key="index">
          <view class="question">{{ question }}</view>
        </view>

        <!-- <button class="start-button" @click="startJourney">开始旅程</button> -->
        <view class="flex justify-center">
          <wd-button type="success" size="large" @click="startJourney">开始旅程</wd-button>
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
  progress.value = Number(decodeURIComponent(numberStr))
  currContent.value = pageContent.value[progress.value]
  console.log('progress.value', progress.value)
  navbarTitle.value = stationMap.get(progress.value)
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
  [8, '我的旅程: 导入'],
  [9, '我的旅程: 第一站'],
  [10, '我的旅程: 第二站'],
  [11, '我的旅程: 第三站'],
  [12, '我的旅程: 第四站'],
  [13, '我的旅程: 第五站'],
  [14, '我的旅程: 第六站'],
  [15, '我的旅程: 第七站'],
])

const navbarTitle = ref<string>('')

const { safeAreaInsets } = uni.getSystemInfoSync()
const imageMap = new Map([
  [0, 'http://115.159.83.61:9000/journey0/start_journey_logo0.png'],
  [1, 'http://115.159.83.61:9000/journey1/start_journey_logo1.png'],
  [2, 'http://115.159.83.61:9000/journey2/start_journey_logo2.png'],
  [3, 'http://115.159.83.61:9000/journey3/start_journey_logo3.png'],
  [4, 'http://115.159.83.61:9000/journey4/start_journey_logo4.png'],
  [5, 'http://115.159.83.61:9000/journey5/start_journey_logo5.png'],
  [6, 'http://115.159.83.61:9000/journey6/start_journey_logo6.png'],
  [7, 'http://115.159.83.61:9000/journey7/start_journey_logo7.png'],
  [8, 'http://115.159.83.61:9000/journey8/start_journey_logo8.png'],
  [9, 'http://115.159.83.61:9000/journey9/start_journey_logo9.png'],
  [10, 'http://115.159.83.61:9000/journey10/start_journey_logo10.png'],
  [11, 'http://115.159.83.61:9000/journey11/start_journey_logo11.png'],
  [12, 'http://115.159.83.61:9000/journey12/start_journey_logo12.png'],
  [13, 'http://115.159.83.61:9000/journey13/start_journey_logo13.png'],
  [14, 'http://115.159.83.61:9000/journey14/start_journey_logo14.png'],
  [15, 'http://115.159.83.61:9000/journey15/start_journey_logo15.png'],
])
const currContent = ref()

const pageContent = ref([
  {
    title: '始发站: 悦心一刻',
    questions: ['• 这是一段怎样的旅程?', '• 我们将如何度过?', '• 你将收获什么?'],
  },
  {
    title: '第一站: 认识你的情绪',
    questions: [
      '• 情绪是什么，又由什么构成?',
      '• 我们和情绪之间的关系是什么?',
      '• 消极情绪真的是痛苦的来源吗?',
    ],
  },
  {
    title: '第二站: 观察你的思维',
    questions: [
      '• 情绪反应的起点是什么?',
      '• 思维的 "默认选项" 如何影响生活?',
      '• 消极思维挥之不去，怎么办?',
    ],
  },
  {
    title: '第三站: 回到此时此刻',
    questions: ['• 什么是回避?', '• 回避将带给我们怎样的影响?', '• 除了回避，我们还能做点什么?'],
  },
  {
    title: '第四站: 放下控制的绳子',
    questions: [
      '• 什么回避和控制不会起作用?',
      '• 除了与痛苦战斗，我们还能怎么做?',
      '• 以正念的方式应对痛苦是可行的吗?',
    ],
  },
  {
    title: '第五站: 接纳当下的你',
    questions: ['• 什么是接纳，接纳为何有帮助?', '• 如何做到接纳?', '• 接纳的背后：自我关怀'],
  },
  {
    title: '第六站: 朝着价值出发',
    questions: [
      '• 价值是什么? 又为什么要关注价值？',
      '• 澄清你的独特价值',
      '• 与你的价值建立连结，创造生活指南',
    ],
  },
  {
    title: '第七站: 为所当为',
    questions: [
      '• 实现价值的魔法是什么？',
      '• 如何以价值为导向指定目标和行动方案？',
      '• 旅程的第八站是什么？',
    ],
  },
  {
    title: '始发站: 悦心一刻',
    questions: ['• 这是一段怎样的旅程?', '• 我们将如何度过?', '• 你将收获什么?'],
  },
  {
    title: '第一站: 认识情绪困扰',
    questions: [
      '• 情绪困扰是什么，又表现为什么？',
      '• 多个情绪困扰会同时出现吗？',
      '• 与情绪困扰有关的常见误解有哪些？',
    ],
  },
  {
    title: '第二站：探索情绪源头',
    questions: [
      '• 情绪困扰来源何处？',
      '• 遗传和环境之间的关系是什么样的？',
      '• 什么构成现在的你？',
    ],
  },
  {
    title: '第三站：调整消极认知',
    questions: ['• 影响情绪状态的认知模式都有哪些？', '• 它们如何造成影响？', '• 我们应该怎么做？'],
  },
  {
    title: '第四站：情绪调节驿站',
    questions: ['• 情绪调节指的是什么？', '• 常用的情绪调节方式有哪些？', '• 我们应该怎么做？'],
  },
  {
    title: '第五站：寻找社会支持',
    questions: ['• 如何寻找社会支持？', '• 如何改善人际关系？', '• 如何应对人际冲突？'],
  },
  {
    title: '第六站: ',
    questions: ['• 什么是幸福？', '• 如何获得幸福？', '• 怎样探索属于你的幸福之路？'],
  },
  {
    title: '第七站：自我关怀指南',
    questions: [
      '• 自我关怀',
      '• 持续关注和评估自己的状态',
      '• 在必要时寻求专业支持',
      '下一站是什么',
    ],
  },
])
const startJourney = async () => {
  const startObj: IStartInter = {
    userId: userStore.userInfo.userId,
    interId: progress.value,
    // interId: 2,
    startTime: getFormattedDate(),
  }
  toast.loading('马上开始...')
  const res = await startInter(startObj)
  console.log(res)
  toast.close()
  if (res.code === 200) {
    interStore.setInterInfo(res.data)
    if (userStore.userInfo.groupId === 0) {
      uni.redirectTo({
        url: '/pages/journey_common/common',
      })
    } else if (userStore.userInfo.groupId === 1) {
      uni.redirectTo({
        url: '/pages/journey_common/daolanHome',
      })
    }
  } else {
    toast.error('出现了一些问题')
  }
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
  font-size: 30px;
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
