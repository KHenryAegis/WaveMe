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
    <wd-navbar title="心情日记" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view v-show="!editMood">
      <view class="font">你此刻感觉怎么样?</view>
      <view class="time-component">
        <view>
          <wd-toast />
          <wd-datetime-picker
            v-model="timeValue"
            :before-confirm="beforeConfirm"
            @confirm="handleConfirm"
          />
        </view>
      </view>

      <view class="mood-container">
        <view class="mood-font" v-for="(mood, index) in moodList" :key="index">
          <img
            :src="mood.iconUrl"
            style="width: 50px; height: 50px"
            @click="selectMood(mood.desc)"
          />
          <view>{{ mood.desc }}</view>
        </view>
      </view>

      <view class="response-font">听到你这么{{ selectedMood }}，我也感到很{{ selectedMood }}!</view>

      <view class="edit-mood-container" @click="switchEditMood">
        <view><wd-icon name="chevron-right-circle" size="40px"></wd-icon></view>
        <view class="edit-mood-font">下一步</view>
      </view>
    </view>

    <view v-show="editMood">
      <view class="font">今天发生了什么?</view>
      <view style="margin-top: 20px">
        <wd-textarea v-model="moodInput" placeholder="记录你的此时此刻……" />
      </view>
      <view @click="submitDiary">
        <view class="edit-mood-container">
          <view><wd-icon name="check-circle" size="40px"></wd-icon></view>
          <view class="edit-mood-font">添加到日记簿</view>
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
} from '@/service/index/feeling'

defineOptions({
  name: 'feeling',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()
const { showNotify, closeNotify } = useNotify()
const timeValue = ref<number>(Date.now())
const toast = useToast()
const selectedMood = ref<string>('开心')
const editMood = ref<boolean>(false)
const moodInput = ref<string>('')
const moodList = ref([
  {
    iconUrl: 'http://115.159.83.61:9000/tool/moodDiary/mood-happy.png',
    desc: '开心',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/moodDiary/mood-calm.png',
    desc: '平静',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/moodDiary/mood-angry.png',
    desc: '生气',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/moodDiary/mood-upset.png',
    desc: '沮丧',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/moodDiary/mood-anxious.png',
    desc: '焦虑',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/moodDiary/mood-sad.png',
    desc: '悲伤',
  },
])

const handleClickLeft = () => {
  if (editMood.value === true) {
    editMood.value = !editMood.value
  } else {
    uni.navigateBack()
  }
}

const switchEditMood = () => {
  editMood.value = !editMood.value
}

const beforeConfirm = (value, resolve, picker) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if (value > Date.now()) {
      resolve(false)
      toast.error('不能选择大于今天的日期')
    } else {
      resolve(true)
    }
  }, 1000)
}

const handleConfirm = ({ value }) => {
  console.log(new Date(value))
}

const submitDiary = async () => {
  const feeling: IAddFeelingItem = {
    userId: userStore.userInfo.userId,
    diaryDate: String(timeValue.value),
    diaryContent: moodInput.value,
    diaryMood: selectedMood.value,
  }
  const res = await addMoodDiary(feeling)
  if (res.code === 200) {
    uni.redirectTo({
      url: '/pages/mood/mood',
    })
    toast.success('提交成功')
  } else {
    showNotify({ type: 'danger', message: '出了一些小问题' })
  }
}

const selectMood = (mood: string) => {
  console.log(mood)
  selectedMood.value = mood
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.font {
  margin-top: 25px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.mood-font {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}

.time-component {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 20px 0 40px 0;
}

.edit-mood-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.edit-mood-font {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.mood-container {
  display: flex;
  justify-content: space-around;
}

.response-font {
  margin: 40px 0 60px 0;
  font-size: 18px;
  text-align: center;
}
</style>
