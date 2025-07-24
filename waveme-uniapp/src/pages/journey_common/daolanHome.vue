<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的旅程',
  },
}
</route>
<template>
  <view w-full h-full v-if="currContent">
    <view class="main-container">
      <wd-navbar
        fixed
        safeAreaInsetTop
        :title="currContent.navbarTitle"
        left-arrow
        @click-left="ToHome"
      ></wd-navbar>

      <wd-toast />

      <view style="width: 100%; height: 20%">
        <image :src="currContent.logoUrl" mode="aspectFit" style="width: 100%" />
      </view>

      <view class="start-inter">
        <view class="title">1.站点导览</view>
        <view v-for="(item, index) in currContent.text" :key="index">
          <view class="text" style="margin-top: 10px">{{ item }}</view>
        </view>
        <view style="margin-top: 12px">
          <wd-button type="info" @click="startJourney()">开始旅程</wd-button>
        </view>
      </view>
      <view class="sub-container" v-if="currGroupId === 0">
        <view class="inter-task" @click="toTask()">
          <view class="title">2.站点任务</view>
          <view class="icon">
            <wd-icon name="list" color="#ffffff" size="24px" />
          </view>
        </view>
        <view class="inter-next" @click="toPunch0()">
          <view class="title">3.站点打卡</view>
          <view class="icon">
            <wd-icon name="add-circle" color="#ffffff" size="24px" />
          </view>
        </view>
      </view>
      <view class="sub-container" v-if="currGroupId === 1">
        <view class="inter-task" @click="toPunch1()">
          <view class="title">2.站点打卡</view>
          <view class="icon">
            <wd-icon name="list" color="#ffffff" size="24px" />
          </view>
        </view>
        <view class="inter-next" @click="toExpand()">
          <view class="title">3.站点拓展</view>
          <view class="icon">
            <wd-icon name="add-circle" color="#ffffff" size="24px" />
          </view>
        </view>
      </view>
    </view>
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useInterStore } from '@/store/inter'
import { useUserStore } from '@/store/user'
import { useToast } from 'wot-design-uni'

const interStore = useInterStore()
const userStore = useUserStore()
const toast = useToast()
const interId = ref<number>()
const currContent = ref<IContentType>()
const currGroupId = ref<number>(0)

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
onShow(() => {
  interId.value = interStore.interInfo.interId
  currContent.value = contentList[interId.value]
  currGroupId.value = userStore.userInfo.groupId
})

type IContentType = {
  navbarTitle: string
  logoUrl: string
  text: string[]
}

const contentList = [
  {
    navbarTitle: '',
    logoUrl: '',
    text: [],
  },
  {
    navbarTitle: '第一站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey1/journeyHome1.png',
    text: ['情绪是一切的起点,', '是我们的一部分'],
  },
  {
    navbarTitle: '第二站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey2/journeyHome2.png',
    text: ['从想法开始, 了解你的情绪,', '还有你自己。'],
  },
  {
    navbarTitle: '第三站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey3/journeyHome3.png',
    text: ['回到我们真正拥有的此时此刻,', '是获得内心平静的第一步'],
  },
  {
    navbarTitle: '第四站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey4/journeyHome4.png',
    text: ['放下控制的绳子,', '尝试用另一种方式与情绪和感受相处'],
  },
  {
    navbarTitle: '第五站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey5/journeyHome5.png',
    text: ['用接纳的态度,', '拥抱独一无二的你'],
  },
  {
    navbarTitle: '第六站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey6/journeyHome6.png',
    text: ['人生最重要的不是所在的位置, 而是你所', '朝的方向, 对你来说, 什么是最重要的?'],
  },
  {
    navbarTitle: '第七站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey7/journeyHome7.png',
    text: ['行动是生活的魔法'],
  },
  {
    navbarTitle: '',
    logoUrl: '',
    text: [],
  },
  {
    navbarTitle: '第一站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey9/journeyHome9.png',
    text: ['情绪是一切的起点,是我们的一部分'],
  },
  {
    navbarTitle: '第二站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey10/journeyHome10.png',
    text: ['探寻情绪的源头，看看情绪从哪里来'],
  },
  {
    navbarTitle: '第三站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey11/journeyHome11.png',
    text: ['思考决定感受，缓解情绪，从调整认知开始'],
  },
  {
    navbarTitle: '第四站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey12/journeyHome12.png',
    text: ['让每一份负面情绪得到温柔化解，', '让每一颗心灵找到平静与力量'],
  },
  {
    navbarTitle: '第五站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey13/journeyHome13.png',
    text: ['用温暖的关系编织守护网'],
  },
  {
    navbarTitle: '第六站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey14/journeyHome14.png',
    text: ['用心生活，用手创造，你拥有的每一个瞬间', '都是最珍贵的'],
  },
  {
    navbarTitle: '第七站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey15/journeyHome15.png',
    text: ['用温暖的关系编织守护网'],
  },
]

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const startJourney = () => {
  if (userStore.userInfo.groupId === 0) {
    interStore.addPageIndex()
    interStore.isStartJourney0 = true
  } else if (userStore.userInfo.groupId === 1) {
    interStore.isStartJourney1 = true
  }
  uni.navigateTo({
    url: '/pages/journey_common/common',
  })
}
const toTask = async () => {
  if (interStore.isStartJourney0 !== true) {
    toast.warning('请先完成站点导览！')
    return
  }
  interStore.isTaskFinished0 = true
  if (interStore.interInfo.interId === 1) {
    await interStore.setPageIndex(13)
  } else if (interStore.interInfo.interId === 2) {
    await interStore.setPageIndex(23)
  } else if (interStore.interInfo.interId === 3) {
    await interStore.setPageIndex(26)
  } else if (interStore.interInfo.interId === 4) {
    await interStore.setPageIndex(36)
  } else if (interStore.interInfo.interId === 5) {
    await interStore.setPageIndex(17)
  } else if (interStore.interInfo.interId === 6) {
    await interStore.setPageIndex(17)
  } else if (interStore.interInfo.interId === 7) {
    await interStore.setPageIndex(13)
  }
  uni.navigateTo({
    url: '/pages/journey_common/common',
  })
}
const toPunch0 = () => {
  if (interStore.isTaskFinished0 !== true || interStore.isStartJourney0 !== true) {
    toast.warning('请先完成站点任务！')
    return
  }
  uni.navigateTo({
    url: '/pages/inquiry/start',
  })
}
const toPunch1 = () => {
  if (interStore.isStartJourney1 !== true) {
    console.log('请先完成站点导览！')
    toast.warning('请先完成站点导览！')
    return
  }
  interStore.isPunchFinished1 = true
  // uni.navigateTo({
  //   url: '/pages/inquiry/start',
  // })
}
const toExpand = async () => {
  if (interStore.isStartJourney1 !== true || interStore.isPunchFinished1 !== true) {
    console.log('请先完成站点打卡！')
    toast.warning('请先完成站点打卡！')
    return
  }
  if (interStore.interInfo.interId === 8) {
    await interStore.setPageIndex(-1)
  } else if (interStore.interInfo.interId === 9) {
    await interStore.setPageIndex(9)
  } else if (interStore.interInfo.interId === 10) {
    await interStore.setPageIndex(-1)
  } else if (interStore.interInfo.interId === 11) {
    await interStore.setPageIndex(-1)
  } else if (interStore.interInfo.interId === 12) {
    await interStore.setPageIndex(-1)
  } else if (interStore.interInfo.interId === 13) {
    await interStore.setPageIndex(-1)
  } else if (interStore.interInfo.interId === 14) {
    await interStore.setPageIndex(-1)
  }
  uni.navigateTo({
    url: '/pages/journey_common/common',
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 10px 0 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.sub-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.start-inter {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 20px;
  background-image: url('http://115.159.83.61:9000/common/daolanHomeBg3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.inter-task {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: auto;
  background-image: url('http://115.159.83.61:9000/common/daolanHomeBg1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.inter-next {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: auto;
  background-image: url('http://115.159.83.61:9000/common/daolanHomeBg2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.title {
  margin-top: 15px;
  font-size: 22px;
  color: white;
}

.text {
  font-size: 18px;
  color: white;
}

.icon {
  width: auto;
  height: auto;
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
