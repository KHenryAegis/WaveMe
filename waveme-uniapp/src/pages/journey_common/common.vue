<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full v-if="pageContent">
    <!-- <wd-navbar fixed safeAreaInsetTop :title="pageContent.navbarTitle"></wd-navbar> -->

    <wd-navbar
      fixed
      safeAreaInsetTop
      :title="pageContent.navbarTitle"
      left-text="退出"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>
    <!-- <view v-if="!loadFlag">
      111
      <wd-loading />
    </view> -->
    <!-- 普通页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'normal'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-common">
        <view class="loading" v-if="!loadFlag">
          <wd-loading></wd-loading>
        </view>

        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" @load="loadFinished" />
      </view>

      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- 输入页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'input'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" @load="loadFinished" />
      </view>
      <view class="input-area px-2">
        <view v-for="(placeholder, index) in pageContent.inputPlaceholders" :key="index">
          <view style="margin-top: 15px" v-if="pageContent.inputQuestions != null">
            {{ pageContent.inputQuestions[index] }}
          </view>
          <view style="margin-top: 5px">
            <wd-textarea v-model="userInputList[index]" :placeholder="placeholder" />
          </view>
        </view>
      </view>
      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- 按钮选择页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'button'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-button">
        <view class="loading" v-if="!loadFlag">
          <wd-loading></wd-loading>
        </view>
        <image
          :src="pageContent.imgUrl"
          mode="widthFix"
          style="width: 100%; margin: 0 auto"
          @load="loadFinished"
        />
      </view>
      <view class="button-area">
        <view v-for="(buttonUrl, index) in pageContent.buttonUrls" :key="index" class="mb-4">
          <view style="width: 80%; height: auto; margin: 12px auto">
            <image
              :src="buttonUrl"
              mode="widthFix"
              @click="toPage(buttonUrl)"
              style="width: 100%"
              @load="loadFinished"
            />
          </view>
        </view>
      </view>
      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- 单选页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'radio'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-input">
        <view class="loading" v-if="!loadFlag">
          <wd-loading></wd-loading>
        </view>
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" @load="loadFinished" />
      </view>
      <view class="input-area">
        <view class="select-btns">
          <view
            v-for="(monster, index) in pageContent.selectUrls"
            :key="index"
            class="select-btn"
            :class="{ selected: selectedItem === index }"
            @click="selectItem(index)"
          >
            <image :src="monster" mode="aspectFit" style="width: 100%" />
          </view>
        </view>
      </view>
      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- 多选页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'checkBox'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-input">
        <view class="loading" v-if="!loadFlag">
          <wd-loading></wd-loading>
        </view>
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" @load="loadFinished" />
      </view>
      <view class="checkBox-area">
        <wd-checkbox-group v-model="checkBoxItem" cell shape="button" custom-class="check-group">
          <template v-for="(item, index) in pageContent.selectUrls" :key="index">
            <wd-checkbox :modelValue="index">{{ item }}</wd-checkbox>
          </template>
        </wd-checkbox-group>
      </view>
      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- 轮播图页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'slide'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-input">
        <view class="loading" v-if="!loadFlag">
          <wd-loading></wd-loading>
        </view>
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" @load="loadFinished" />
      </view>
      <view class="input-area" style="width: 100%">
        <wd-swiper
          :list="pageContent.slideImages"
          :autoplay="false"
          v-model:current="currentSlideImage"
          :indicator="{ showControls: true }"
          :loop="false"
          imageMode="aspectFit"
          @click="handleSlideClick"
          @change="onSlideChange"
          customClass="swiper"
        ></wd-swiper>
      </view>
      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- 音频页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'audio'"
    >
      <view style="height: 13%"></view>
      <view class="middle-img-input">
        <view class="loading" v-if="!loadFlag">
          <wd-loading></wd-loading>
        </view>
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" @load="loadFinished" />
      </view>
      <view class="audio-area">
        <view style="text-align: center">
          <audio
            style="text-align: left"
            :src="pageContent.audioUrls[0]"
            :poster="audioPlayer.poster"
            :name="audioPlayer.name"
            :author="audioPlayer.author"
            :action="audioAction"
            controls
          ></audio>
        </view>
      </view>
      <view class="operation-area">
        <view class="operation-btn" @click="toPrev">
          <img :src="prevIconUrl" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">上一页</view>
        </view>
        <view class="operation-btn" @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px; text-align: center">
            {{ pageContent.operationText }}
          </view>
        </view>
      </view>
    </view>

    <!-- <view>
      <wd-button @click="testsubmit">测试提交干预</wd-button>
    </view> -->
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import {
  getPageByInterId,
  submitInter,
  ISubmitInter,
  startInter,
  IStartInter,
  getUserGoal,
} from '@/service/index/inter'
import { useToast, useMessage } from 'wot-design-uni'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'

const loadFlag = ref(false)
const interStore = useInterStore()
const userStore = useUserStore()
const message = useMessage()
const globalPageControlStore = useGlobalPageControlStore()
const toast = useToast()
const pageType = ref<string>('normal')
const prevIconUrl = ref<string>('http://115.159.83.61:9000/common/prev.png')
const pageContent = ref<IInterPage>()
const currentSlideImage = ref<number>(0)
const selectedItem = ref<number>(-1)
const checkBoxItem = ref<number[]>([])
const currInterId = ref<number>(interStore.interInfo.interId % 8)
const userInputList = ref<Array<string>>([])
const hasOperation = computed(() => {
  return pageContent.value.operationIcon != null && pageContent.value.operationText != null
})

const audioPlayer = ref({
  poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
  name: '致爱丽丝',
  author: '暂无',
})
const audioAction = ref({
  method: 'pause',
})

onShow(async () => {
  // 获取页面数据
  const index = interStore.pageIndex
  pageContent.value = interStore.interInfo.interPages[index]
  console.log('pageContent.value', pageContent.value)
  // 恢复页面状态
  recoverPageStatus()
  // 第一套干预的结束部分展示之前的目标
  fillUserGoal()
})

const ToHome = () => {
  // message
  //   .confirm({
  //     msg: '确定退出干预吗？',
  //     title: '提示',
  //   })
  //   .then(() => {
  //     // 如果是 input 页面 保存用户输入到pinia
  //     if (pageContent.value.pageType === 'input') {
  //       let inputContent = ''
  //       for (let i = 0; i < userInputList.value.length; i++) {
  //         inputContent = inputContent + userInputList.value[i] + '%'
  //       }
  //       interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  //     }
  //     uni.switchTab({ url: '/pages/home/home' })
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // 如果是 input 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'input') {
    let inputContent = ''
    for (let i = 0; i < userInputList.value.length; i++) {
      inputContent = inputContent + userInputList.value[i] + '%'
    }
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  uni.switchTab({ url: '/pages/home/home' })
}

const handleSlideClick = (e) => {
  console.log(e)
}

const onSlideChange = (e) => {
  console.log(e)
}

const selectItem = (index) => {
  selectedItem.value = index
}

const toPrev = () => {
  const currIndex = interStore.pageIndex
  // 任务部分的第一个页面禁止返回上一页
  if (interStore.pageIndex > 0) {
    saveDateToPinia()
    if (interStore.interInfo.interPages[currIndex - 1].pageType !== 'common') {
      if (interStore.interInfo.interPages[currIndex].operationText === '开始任务') {
        toast.warning('请先完成任务！')
        return
      }
      interStore.minusPageIndex()
      uni.redirectTo({
        url: '/pages/journey_common/common',
      })
    } else {
      interStore.minusPageIndex()
      uni.redirectTo({
        url: '/pages/journey_common/daolanHome',
      })
    }
  }
}

const toPage = (buttonUrl: string) => {
  loadFlag.value = true
  // botton 页面的跳转逻辑 根据按钮的图片名称判断需要跳转到哪个页面
  // 干预1页面14
  if (buttonUrl === 'http://115.159.83.61:9000/journey1/renwu1(1).png') {
    interStore.setPageIndex(15)
    globalPageControlStore.globalPageControlInfo.toDaolanHome = true
  }
  // 干预2页面6
  if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan3.png') {
    interStore.setPageIndex(7)
    globalPageControlStore.globalPageControlInfo.firstStepPage6_2 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan4.png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage6_2 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(8)
    }
    // 干预2页面15
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan15.png') {
    interStore.setPageIndex(16)
    globalPageControlStore.globalPageControlInfo.firstStepPage15_2 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan16.png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage15_2 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(18)
    }
  }
  // 干预2页面24
  if (buttonUrl === 'http://115.159.83.61:9000/journey2/renwu3.png') {
    interStore.setPageIndex(25)
    globalPageControlStore.globalPageControlInfo.firstStepPage24_2 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/renwu4.png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage24_2 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(30)
      globalPageControlStore.globalPageControlInfo.secondStepPage24_2 = true
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/renwu5.png') {
    if (
      globalPageControlStore.globalPageControlInfo.secondStepPage24_2 === false ||
      globalPageControlStore.globalPageControlInfo.firstStepPage24_2 === false
    ) {
      toast.warning('请先查看第二步')
      return
    } else {
      interStore.setPageIndex(31)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  // 干预3页面27
  if (buttonUrl === 'http://115.159.83.61:9000/journey3/renwu2(1).png') {
    interStore.setPageIndex(28)
    globalPageControlStore.globalPageControlInfo.firstStepPage27_3 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey3/renwu2(2).png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage27_3 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(29)
      globalPageControlStore.globalPageControlInfo.secondStepPage27_3 = true
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey3/renwu2(3).png') {
    if (
      globalPageControlStore.globalPageControlInfo.secondStepPage27_3 === false ||
      globalPageControlStore.globalPageControlInfo.firstStepPage27_3 === false
    ) {
      toast.warning('请先查看第二步')
      return
    } else {
      interStore.setPageIndex(30)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  // 干预4页面37
  if (buttonUrl === 'http://115.159.83.61:9000/journey4/renwu2(1).png') {
    interStore.setPageIndex(38)
    globalPageControlStore.globalPageControlInfo.firstStepPage37_4 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey4/renwu2(2).png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage37_4 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(39)
      globalPageControlStore.globalPageControlInfo.secondStepPage37_4 = true
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey4/renwu2(3).png') {
    if (
      globalPageControlStore.globalPageControlInfo.secondStepPage37_4 === false ||
      globalPageControlStore.globalPageControlInfo.firstStepPage37_4 === false
    ) {
      toast.warning('请先查看第二步')
      return
    } else {
      interStore.setPageIndex(40)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  // 干预5页面18
  if (buttonUrl === 'http://115.159.83.61:9000/journey5/renwu2(1).png') {
    interStore.setPageIndex(19)
    globalPageControlStore.globalPageControlInfo.firstStepPage18_5 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey5/renwu2(2).png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage18_5 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(23)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  // 干预6页面18
  if (buttonUrl === 'http://115.159.83.61:9000/journey6/renwu2(1).png') {
    interStore.setPageIndex(19)
    globalPageControlStore.globalPageControlInfo.toDaolanHome = true
  }
  // 干预7页面14
  if (buttonUrl === 'http://115.159.83.61:9000/journey7/renwu2(1).png') {
    interStore.setPageIndex(15)
    globalPageControlStore.globalPageControlInfo.toDaolanHome = true
  }
  uni.redirectTo({
    url: '/pages/journey_common/common',
  })
}

const loadFinished = () => {
  console.log('图片加载完成')
  loadFlag.value = true
  // toast.close()
}

const doOperation = async () => {
  // toast.loading('图片加载中...')
  loadFlag.value = false
  // 保存数据到 pinia
  saveDateToPinia()
  // 如果是 button 页面 判断一下是否前往 daolanHome
  if (pageContent.value.pageType === 'button') {
    if (hasOperation.value && globalPageControlStore.globalPageControlInfo.toDaolanHome) {
      uni.redirectTo({
        url: '/pages/journey_common/daolanHome',
      })
      return
    } else {
      toast.warning('请先完成任务')
      return
    }
  }
  // 如果用户点击的是返回按钮 需要判断当前是什么页面以跳转回原 button 页面
  if (pageContent.value.operationIcon.endsWith('back.png')) {
    if (pageContent.value.pageId === 19 && pageContent.value.interId === 1) {
      await interStore.setPageIndex(14)
    } else if (pageContent.value.pageId === 7 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(6)
    } else if (pageContent.value.pageId === 17 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(15)
    } else if (pageContent.value.pageId === 29 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(24)
    } else if (pageContent.value.pageId === 30 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(24)
    } else if (pageContent.value.pageId === 31 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(24)
    } else if (pageContent.value.pageId === 28 && pageContent.value.interId === 3) {
      await interStore.setPageIndex(27)
    } else if (pageContent.value.pageId === 29 && pageContent.value.interId === 3) {
      await interStore.setPageIndex(27)
    } else if (pageContent.value.pageId === 30 && pageContent.value.interId === 3) {
      await interStore.setPageIndex(27)
    } else if (pageContent.value.pageId === 38 && pageContent.value.interId === 4) {
      await interStore.setPageIndex(37)
    } else if (pageContent.value.pageId === 39 && pageContent.value.interId === 4) {
      await interStore.setPageIndex(37)
    } else if (pageContent.value.pageId === 40 && pageContent.value.interId === 4) {
      await interStore.setPageIndex(37)
    } else if (pageContent.value.pageId === 22 && pageContent.value.interId === 5) {
      await interStore.setPageIndex(18)
    } else if (pageContent.value.pageId === 26 && pageContent.value.interId === 5) {
      await interStore.setPageIndex(18)
    } else if (pageContent.value.pageId === 25 && pageContent.value.interId === 6) {
      await interStore.setPageIndex(18)
    } else if (pageContent.value.pageId === 19 && pageContent.value.interId === 7) {
      await interStore.setPageIndex(14)
    }
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
    return
  }
  // 如果是结束部分最后一页 提交干预 返回主页面
  // 如果是第二套干预的拓展 提交干预 返回主页面
  if (
    (pageContent.value.interId === 99 && pageContent.value.operationIcon.endsWith('finish.png')) ||
    (pageContent.value.interId === 100 && pageContent.value.operationIcon.endsWith('finish.png')) ||
    (userStore.userInfo.groupId === 1 && pageContent.value.operationText.endsWith('拓展'))
  ) {
    const submitObj: ISubmitInter = {
      userId: userStore.userInfo.userId,
      interId: interStore.interInfo.interId,
      endTime: getFormattedDate(),
      inputPages: interStore.inputPages,
      inputContent: interStore.inputContent,
    }
    const res = await submitInter(submitObj)
    console.log(res)
    if (res.code === 200) {
      toast.success('感谢！')
      // 清除缓存
      interStore.clearInternfo()
      globalPageControlStore.clearInternfo()
      uni.redirectTo({ url: '/pages/home/home' })
    } else {
      toast.error('出现了一些问题')
    }
  }
  // 如果是第二套干预7的最后一页 提交干预 跳转到旅程报告
  if (userStore.userInfo.groupId === 1 && pageContent.value.operationText === '查看你的旅程报告') {
    const submitObj: ISubmitInter = {
      userId: userStore.userInfo.userId,
      interId: interStore.interInfo.interId,
      endTime: getFormattedDate(),
      inputPages: interStore.inputPages,
      inputContent: interStore.inputContent,
    }
    const res = await submitInter(submitObj)
    console.log(res)
    if (res.code === 200) {
      toast.success('感谢！')
      // 清除缓存
      interStore.clearInternfo()
      globalPageControlStore.clearInternfo()
      toReport()
    } else {
      toast.error('出现了一些问题')
    }
  }

  // pageIndex 自增
  const res = await interStore.addPageIndex()
  // 如果是最后一页就不再进行跳转
  // if (res === 'pageEnd') {
  //   return
  // }

  // 如果下一页不是跳转到特殊页面(journey通用页面) 就刷新当前页面
  if (pageContent.value.specialPage === null) {
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
  } else if (pageContent.value.specialPage === '/pages/home/home') {
    // 如果是干预0，提交内容
    const submitObj: ISubmitInter = {
      userId: userStore.userInfo.userId,
      interId: interStore.interInfo.interId,
      endTime: getFormattedDate(),
      inputPages: interStore.inputPages,
      inputContent: interStore.inputContent,
    }
    const res = await submitInter(submitObj)
    if (res.code === 200) {
      // 清除缓存
      interStore.clearInternfo()
      globalPageControlStore.clearInternfo()
      uni.redirectTo({ url: '/pages/home/home' })
    } else {
      toast.error('出现了一些问题')
    }
    uni.switchTab({
      url: pageContent.value.specialPage,
    })
  } else {
    // 否则跳转到特殊页面
    uni.redirectTo({
      url: pageContent.value.specialPage,
    })
  }
}

const saveDateToPinia = () => {
  // 如果是 input 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'input') {
    let inputContent = ''
    for (let i = 0; i < userInputList.value.length; i++) {
      // 判断用户有无未填写
      if (userInputList.value[i] === '') {
        toast.error('请不要留下空白！')
        return
      } else if (
        userInputList.value[i].indexOf('%') !== -1 ||
        userInputList.value[i].indexOf('#') !== -1 ||
        userInputList.value[i].indexOf('_') !== -1
      ) {
        toast.error('请不要输入 % # _ 字符！')
        return
      }
      inputContent = inputContent + userInputList.value[i] + '%'
    }
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  // 如果是 radio 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'radio') {
    // 判断用户有无未填写
    if (selectedItem.value === -1) {
      toast.error('选择一项！')
      return
    }
    const inputContent = pageContent.value.selectUrls[selectedItem.value]
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  // 如果是 checkBox 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'checkBox') {
    // 判断用户有无未填写
    if (checkBoxItem.value.length < 1) {
      toast.error('选择至少一项！')
      return
    }
    let inputContent = ''
    for (let i = 0; i < checkBoxItem.value.length; i++) {
      inputContent = inputContent + pageContent.value.selectUrls[checkBoxItem.value[i]] + '_'
    }
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
}

const recoverPageStatus = () => {
  pageType.value = pageContent.value.pageType
  // 如果是 input 页面 恢复状态
  if (pageType.value === 'input') {
    console.log('interStore.userInputMap', interStore.userInputMap)
    if (interStore.userInputMap && interStore.userInputMap.size > 0) {
      if (interStore.userInputMap.has(pageContent.value.pageId)) {
        let inputString = interStore.userInputMap.get(pageContent.value.pageId)
        inputString = inputString.slice(0, -1)
        const inputList = inputString.split('%')
        inputList.forEach((input, index) => {
          userInputList.value[index] = input
        })
      }
    }
    // 如果是 checkBox 页面 恢复状态
  } else if (pageType.value === 'checkBox') {
    const checkBoxItemList = pageContent.value.selectUrls
    if (interStore.userInputMap && interStore.userInputMap.size > 0) {
      if (interStore.userInputMap.has(pageContent.value.pageId)) {
        let checkBoxInputString = interStore.userInputMap.get(pageContent.value.pageId)
        checkBoxInputString = checkBoxInputString.slice(0, -1)
        const checkBoxInputList = checkBoxInputString.split('_')
        checkBoxInputList.forEach((item, index) => {
          if (checkBoxItemList.includes(item)) {
            checkBoxItem.value.push(checkBoxItemList.indexOf(item))
          }
        })
      }
    }
  }
}

const testsubmit = () => {
  uni.redirectTo({
    url: '/pages/inquiry/eval',
  })
}

const fillUserGoal = () => {
  if (pageContent.value.interId === 99 && pageContent.value.pageId === 1) {
    getUserGoal().then((res) => {
      userInputList.value[0] = res.data
    })
  }
}

const toReport = async () => {
  interStore.clearInternfo()
  const startObj: IStartInter = {
    userId: userStore.userInfo.userId,
    interId: 100,
    startTime: getFormattedDate(),
  }
  const res = await startInter(startObj)
  if (res.code === 200) {
    interStore.setInterInfo(res.data)
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
  } else {
    toast.error('出现了一些问题')
  }
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.main-container-bg-0 {
  background: linear-gradient(
    180deg,
    rgba(255, 221, 225, 0.67) 0%,
    rgba(242, 222, 213, 0.3) 41.21%,
    rgba(255, 252, 219, 0.67) 100%
  );
}

.main-container-bg-1 {
  background: linear-gradient(180deg, rgba(116, 235, 213, 0.1) 0%, rgba(227, 238, 255, 1) 100%);
}

.main-container-bg-2 {
  background: linear-gradient(90deg, rgba(171, 236, 214, 0.29) 0%, rgba(251, 237, 150, 0.29) 100%);
}

.main-container-bg-3 {
  background: linear-gradient(180deg, rgba(168, 237, 234, 1) 0%, rgba(254, 214, 227, 1) 100%),
    linear-gradient(180deg, rgba(255, 241, 235, 1) 0%, rgba(172, 224, 249, 1) 100%),
    linear-gradient(180deg, rgba(230, 233, 240, 1) 0%, rgba(238, 241, 245, 1) 100%),
    linear-gradient(180deg, rgba(193, 223, 196, 1) 0%, rgba(222, 236, 221, 1) 100%),
    linear-gradient(90deg, rgba(100, 179, 244, 1) 0%, rgba(194, 229, 156, 1) 100%),
    linear-gradient(90deg, rgba(238, 156, 167, 1) 0%, rgba(255, 221, 225, 1) 100%),
    linear-gradient(180deg, rgba(253, 219, 146, 1) 0%, rgba(209, 253, 255, 1) 100%),
    linear-gradient(90deg, rgba(253, 252, 251, 1) 0%, rgba(226, 209, 195, 1) 100%),
    linear-gradient(180deg, rgba(168, 237, 234, 1) 0%, rgba(254, 214, 227, 1) 100%),
    linear-gradient(180deg, rgba(161, 196, 253, 1) 0%, rgba(194, 233, 251, 1) 100%),
    linear-gradient(180deg, rgba(172, 203, 238, 1) 0%, rgba(231, 240, 253, 1) 100%),
    linear-gradient(180deg, rgba(161, 196, 253, 1) 0%, rgba(194, 233, 251, 1) 100%),
    linear-gradient(180deg, rgba(193, 223, 196, 0.75) 0%, rgba(222, 236, 221, 0.75) 100%);
}

.main-container-bg-4 {
  background: linear-gradient(
    180deg,
    rgba(243, 231, 233, 1) 0%,
    rgba(227, 238, 255, 1) 99%,
    rgba(227, 238, 255, 1) 100%
  );
}
.main-container-bg-5 {
  background: linear-gradient(
    180deg,
    rgba(42, 130, 228, 0.44) 0%,
    rgba(175, 205, 253, 0.36) 0%,
    rgba(246, 223, 255, 0.46) 20.84%,
    rgba(203, 245, 244, 0.8) 99.71%,
    rgba(42, 130, 228, 0.04) 101.71%
  );
}
.main-container-bg-6 {
  background: linear-gradient(
    180deg,
    rgba(227, 238, 255, 0.8) 0%,
    rgba(227, 237, 255, 0.8) 16.94%,
    rgba(233, 222, 250, 0.78) 100%
  );
}

.main-container-bg-7 {
  background: linear-gradient(
    180deg,
    rgba(141, 247, 252, 0.3) 0%,
    rgba(176, 232, 172, 0.3) 59.37%,
    rgba(248, 255, 174, 0.3) 99.01%,
    rgba(255, 252, 219, 1) 100.01%
  );
}

.middle-img-common {
  width: 100%;
  height: auto;
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* margin-top: 30rpx; */
  /* padding: 10px; */
}

.middle-img-button {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* padding: 10px; */
}

.input-area {
  width: 90%;
  height: auto;
  margin: 18px auto;
}

.audio-area {
  width: 90%;
  height: auto;
  margin: 55px auto;
}

.checkBox-area {
  width: auto;
  height: auto;
  overflow-x: scroll;
}

.check-group {
  background-color: rgba(255, 255, 255, 0);
}

.button-area {
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.operation-area {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 85%;
  height: auto;
  margin: 20px auto;
}

.operation-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: auto;
}

.select-btns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
}
.select-btn {
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  opacity: 0.6;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.select-btn:hover,
.select-btn.selected {
  opacity: 1;
  transform: scale(1.1);
}
.select-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.swiper {
  /* height: 540rpx; */
}

.loading {
  position: absolute; /* 使元素脱离文档流，以便可以随意定位 */
  top: 15%; /* 距离顶部 25% */
  left: 50%; /* 距离左边 50% */
  transform: translate(-50%, -50%); /* 将元素的中心点移到指定位置 */
}

.check-group {
  background-color: rgba(255, 255, 255, 0);
}
</style>
