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
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="心情日记"
      left-arrow
      @click-left="handleClickLeft"
    ></wd-navbar>
    <view class="main-container" v-for="(diary, index) in diaryList" :key="index">
      <view class="card" @click="toDiaryDetail(index)">
        <img class="emoji" :src="imageMap.get(diary.diaryMood)" />
        <view class="info">
          <view class="left-box">
            <view class="date">{{ diary.dateDay }}</view>
            <view class="time">{{ diary.dateTime }}</view>
          </view>
          <view class="mood">{{ diary.diaryMood }}</view>
        </view>
        <view class="right_box">
          <image
            src="http://115.159.83.61:9000/tool/tool-list.png"
            style="width: 45px; height: 45px"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useToast, useNotify } from 'wot-design-uni'
import { useUserStore } from '@/store/user'
import {
  addMoodDiary,
  editMoodDiary,
  IAddFeelingItem,
  IEditFeelingItem,
  IGetFeelingItem,
  getAllMoodDiary,
} from '@/service/index/feeling'

defineOptions({
  name: 'feeling',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const { showNotify, closeNotify } = useNotify()
const diaryList = ref<IGetFeelingItem[]>()
const imageMap = new Map([
  ['开心', 'http://115.159.83.61:9000/tool/moodDiary/mood-happy.png'],
  ['平静', 'http://115.159.83.61:9000/tool/moodDiary/mood-calm.png'],
  ['生气', 'http://115.159.83.61:9000/tool/moodDiary/mood-angry.png'],
  ['沮丧', 'http://115.159.83.61:9000/tool/moodDiary/mood-upset.png'],
  ['焦虑', 'http://115.159.83.61:9000/tool/moodDiary/mood-anxious.png'],
  ['悲伤', 'http://115.159.83.61:9000/tool/moodDiary/mood-sad.png'],
])

onShow(async () => {
  const res = await getAllMoodDiary()
  if (res.code === 200) {
    diaryList.value = res.data
    console.log(diaryList.value)
  } else {
    showNotify({ type: 'danger', message: '出了一些小问题' })
  }
})

const handleClickLeft = () => {
  uni.navigateBack()
}

const toDiaryDetail = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(diaryList.value[index]))
  uni.navigateTo({
    url: `/pages/diaryList/diaryDetail?detail=${detailObject}`,
  })
}

const doOperation = (e) => {
  if (e.item.content === '编辑') {
    console.log(e.item.content)
  } else if (e.item.content === '删除') {
    console.log(e.item.content)
  }
}

const ToFeeling = () => {
  uni.navigateTo({
    url: '/pages/feeling/feeling',
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 55px 0 20px 0;
}
.card {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: auto;
  padding: 12px 25px 12px 25px;
  margin: -12px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
}
.emoji {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.left-box {
  display: flex;
  align-items: center;
}
.right_box {
  display: flex;
  justify-content: center;
  width: auto;
}
.date {
  font-size: 14px;
  color: #666;
}
.mood {
  font-size: 16px;
  font-weight: bold;
}
.time {
  margin-left: 10px;
  font-size: 12px;
  color: #999;
}
.icon {
  font-size: 20px;
  color: #999;
}
</style>
