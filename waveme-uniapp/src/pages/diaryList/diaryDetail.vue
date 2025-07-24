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
      title="心情日记"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="card">
        <img class="emoji" :src="imageMap.get(content.diaryMood)" />
        <view class="info">
          <view class="left-box">
            <view class="date">{{ content.dateDay }}</view>
            <view class="time">{{ content.dateTime }}</view>
          </view>
          <view class="mood">{{ content.diaryMood }}</view>
        </view>
        <view class="right_box">
          <image
            src="http://115.159.83.61:9000/tool/tool-list.png"
            style="width: 45px; height: 45px"
          />
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view class="title">日记内容：</view>
          <view>{{ content.diaryContent }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import {
  addMoodDiary,
  editMoodDiary,
  IAddFeelingItem,
  IEditFeelingItem,
  IGetFeelingItem,
  getAllMoodDiary,
} from '@/service/index/feeling'

const content = ref<IGetFeelingItem>({
  diaryId: -1,
  userId: '',
  diaryContent: '',
  diaryDate: '',
  diaryMood: '',
  dateDay: '',
  dateTime: '',
})
const imageMap = new Map([
  ['开心', 'http://115.159.83.61:9000/tool/moodDiary/mood-happy.png'],
  ['平静', 'http://115.159.83.61:9000/tool/moodDiary/mood-calm.png'],
  ['生气', 'http://115.159.83.61:9000/tool/moodDiary/mood-angry.png'],
  ['沮丧', 'http://115.159.83.61:9000/tool/moodDiary/mood-upset.png'],
  ['焦虑', 'http://115.159.83.61:9000/tool/moodDiary/mood-anxious.png'],
  ['悲伤', 'http://115.159.83.61:9000/tool/moodDiary/mood-sad.png'],
])
onLoad((options) => {
  content.value = JSON.parse(decodeURIComponent(options.detail))
  console.log(content.value)
})

const goBack = () => {
  uni.navigateBack()
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.box {
  box-sizing: content-box;
  width: 85%;
  height: auto;
  padding: 12px;
  margin: 15px auto;
  border-radius: 10px;
}

.title {
  margin: 12px 0 12px 0;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
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
</style>
