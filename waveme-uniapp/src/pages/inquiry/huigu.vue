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
    <wd-navbar fixed safeAreaInsetTop title="打卡"></wd-navbar>

    <!-- 普通页面 -->
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image :src="interIdToUrlMap.get(currInterId)" mode="aspectFit" style="width: 100%" />
      </view>

      <view @click="doOperation" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          别走，去看看主创人员的隐藏彩蛋
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { getPageByInterId } from '@/service/index/inter'
import { useToast, useMessage } from 'wot-design-uni'

const interStore = useInterStore()
const message = useMessage()
const globalPageControlStore = useGlobalPageControlStore()
const toast = useToast()

const currInterId = ref<number>(interStore.interInfo.interId)
const pageType = ref<string>('normal')
const pageContent = ref<IInterPage>()
const radioValue = ref<string>()
const currentSlideImage = ref<number>(0)
const selectedItem = ref()
const userInputList = ref<Array<string>>([])
const interIdToUrlMap = new Map<number, string>([
  [1, 'http://115.159.83.61:9000/journey1/daka5.png'],
  [2, 'http://115.159.83.61:9000/journey2/daka6.png'],
  [3, 'http://115.159.83.61:9000/journey3/daka5.png'],
  [4, 'http://115.159.83.61:9000/journey4/daka5.png'],
  [5, 'http://115.159.83.61:9000/journey5/daka5.png'],
  [6, 'http://115.159.83.61:9000/journey6/daka5.png'],
  [7, 'http://115.159.83.61:9000/journey7/daka5.png'],
  // Add more mappings as needed
])

onShow(async () => {
  console.log('currInterId', currInterId.value)
})

const handleSlideClick = (e) => {
  console.log(e)
}

const onSlideChange = (e) => {
  console.log(e)
}

const selectItem = (index) => {
  selectedItem.value = index
}

const toPage = (buttonUrl: string) => {}

const doOperation = async () => {
  uni.redirectTo({
    url: '/pages/inquiry/eval',
  })
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img-common {
  width: 100%;
  /* 原来是60%，要讨论一下 */
  height: 100%;
}

.middle-img-input {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-height: 40%;
  /* margin-top: 30rpx; */
  /* padding: 10px; */
}

.middle-img-button {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-height: 50%;
  /* padding: 10px; */
}

.input-area {
  flex: 1;
  width: 90%;
  overflow-y: scroll;
}

.button-area {
  flex: 1;
  width: 100%;
  overflow-y: scroll;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
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
</style>
