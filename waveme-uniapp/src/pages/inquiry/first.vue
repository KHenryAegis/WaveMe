<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    // navigationBarTitleText: '干预测试',
  },
}
</route>
<template>
  <view class="w-full h-full">
    <view>
      <wd-navbar fixed safeAreaInsetTop title="问卷" left-arrow></wd-navbar>
    </view>

    <view class="con px-2">
      <!-- <view style="height: 10%"></view> -->
      <view class="header">
        <text
          class="header-item"
          :class="{
            active:
              questionItem[curId - 1].inquiryId === 1 || questionItem[curId - 1].inquiryId === 2,
          }"
        >
          关于你
        </text>
        <text
          class="header-item"
          :class="{
            active:
              questionItem[curId - 1].inquiryId === 4 || questionItem[curId - 1].inquiryId === 5,
          }"
        >
          你的状态
        </text>
        <text
          class="header-item"
          :class="{
            active: questionItem[curId - 1].inquiryId === 7,
          }"
        >
          你的期待
        </text>
      </view>
      <view class="content flex flex-col">
        <text class="title">{{ questionItem[curId - 1].title }}</text>
        <text class="description">
          {{ questionItem[curId - 1].description }}
        </text>

        <!-- 选择题 -->
        <view
          class="gender-options"
          v-if="
            questionItem[curId - 1]?.options.length != 0 && questionItem[curId - 1]?.inquiryId != 7
          "
        >
          <view
            v-for="item in questionItem[curId - 1]?.options"
            :key="item.score"
            :class="{ selected: answers[curId - 1] === item.score }"
            @click="selectOption(item.score)"
          >
            <button class="gender-button w-50 mb-5">{{ item.text }}</button>
          </view>
          <!-- <button class="gender-button w-50 font-800 mb-5">女</button> -->
          <!-- <button class="gender-button w-50 font-800">男</button> -->
        </view>

        <!-- 填空题 -->
        <view class="flex flex-col justify-center" v-if="questionItem[curId - 1]?.inquiryId == 2">
          <view class="flex justify-center">
            <wd-input-number v-model="age" @change="handleChange" input-width="80px" />
          </view>

          <view class="mt-5 flex justify-center">
            <wd-button class="w-40 mb-5 ml-5" @click="handleAgeChange">确定</wd-button>
          </view>
        </view>

        <!-- 第六个特殊的 -->
        <view class="flex flex-col justify-center" v-if="questionItem[curId - 1]?.inquiryId == 7">
          <wd-checkbox-group
            v-model="goal"
            cell
            shape="button"
            size="large"
            custom-class="check_group"
          >
            <wd-checkbox modelValue="1">缓解焦虑压力</wd-checkbox>
            <wd-checkbox modelValue="2">减少沮丧低落</wd-checkbox>
            <wd-checkbox modelValue="3">提高幸福感</wd-checkbox>
            <wd-checkbox modelValue="4">寻找自我价值</wd-checkbox>
            <wd-checkbox modelValue="5">学习情绪调节方式</wd-checkbox>
            <wd-checkbox modelValue="6">提高行动力</wd-checkbox>
            <wd-checkbox modelValue="7">除此之外，我还希望……</wd-checkbox>
          </wd-checkbox-group>
        </view>

        <view v-if="goal.includes('7')" class="">
          <wd-input v-model="customGoal" placeholder="请输入你的其他期待" />
        </view>
      </view>

      <view class="flex justify-center mt-5">
        <wd-button @click="submit" v-if="curId == questionItem.length">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getInquiryByPos, submitInquiry, InquiryResultArray } from '@/service/ganyu/inquiry'

import { useUserStore } from '@/store/user'
import { useToast, useNotify } from 'wot-design-uni'

const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()
const toast = useToast()
const customGoal = ref()
const goal = ref([])
const curId = ref(1)
const answers = ref([{}])
// answers的理想：{'inquiryId':1,'content':数字或者填的内容}
const age = ref(18)
const questionItem = ref([
  {
    inquiryId: 1,
    title: '你的性别',
    description: '为了提供更好的服务，请完善个人信息，该信息仅对你个人可见，我们会为你保密！',
    options: [
      { text: '女', score: 1 },
      { text: '男', score: 2 },
    ],
  },
  {
    inquiryId: 2,
    title: '你的年龄',
    description: '为了提供更好的服务，请完善个人信息，该信息仅对你个人可见，我们会为你保密！',
    options: [],
  },
  {
    inquiryId: 4,
    title: '最近一个月，你的情绪状态如何？',
    description: '情绪时刻变化，最近一个月你的情绪底色是什么？',
    options: [
      { text: '沮丧、低落', score: 1 },
      { text: '紧张、焦虑', score: 2 },
      { text: '以上两类情绪的混合', score: 3 },
    ],
  },
  {
    inquiryId: 5,
    title: '这种情绪状态的频率和强度如何？',
    description: '过去一个月内，这种情绪的发生次数和强烈程度（对生活的困扰程度）是什么？',
    options: [
      { text: '偶尔，轻微困扰', score: 1 },
      { text: '有时，中等困扰', score: 2 },
      { text: '经常，比较困扰', score: 3 },
      { text: '几乎每天，非常困扰', score: 4 },
    ],
  },

  {
    inquiryId: 6,
    title: '你如何应对这种情绪状态？',
    description: '当这种情绪来临，你一般怎么做？',
    options: [
      { text: '分散注意，不去想它', score: 1 },
      { text: '觉察情绪，接纳它', score: 2 },
      { text: '我不知道怎么做', score: 3 },
      { text: '其他方式', score: 4 },
    ],
  },
  {
    inquiryId: 7,
    title: '你期待悦心一刻陪你达到什么目标？',
    description: '三周后，你期待生活有怎样的改变？',
    options: [
      { text: '缓解焦虑压力' },
      { text: '减少沮丧低落' },
      { text: '提高幸福感' },
      { text: '寻找自我价值' },
      { text: '学习情绪调节方式' },
      { text: '提高行动力' },
      { text: '除此之外，我还希望……' },
    ],
  },
])

onLoad(() => {
  console.log(userStore.userInfo)
})

const selectOption = (score: number) => {
  answers.value[curId.value - 1] = {
    inquiryId: questionItem.value[curId.value - 1].inquiryId,
    score,
    text: '',
  }

  curId.value++
}

const handleAgeChange = () => {
  answers.value[curId.value - 1] = {
    inquiryId: questionItem.value[curId.value - 1].inquiryId,
    score: -1,
    text: String(age.value),
  }
  curId.value++
}

const submit = async () => {
  toast.loading('提交中...')
  console.log('goal', goal.value)
  answers.value[curId.value - 1] = {
    inquiryId: questionItem.value[curId.value - 1].inquiryId,
    score: -1,
    text: '',
  }

  // 先处理一下第七题 做一个映射

  const goalMapping = {
    1: '缓解焦虑压力',
    2: '减少沮丧低落',
    3: '提高幸福感',
    4: '寻找自我价值',
    5: '学习情绪调节方式',
    6: '提高行动力',
  }

  goal.value.forEach((goalId) => {
    if (goalId !== '7') {
      answers.value[curId.value - 1].text += goalMapping[goalId] + ', '
    } else {
      answers.value[curId.value - 1].text += customGoal.value + ', '
    }
  })

  const formData = ref([])
  console.log(answers.value)
  for (let i = 0; i < answers.value.length; i++) {
    if (answers.value[i].score === -1) {
      formData.value.push({
        // userId: userStore.userInfo.userId,
        inquiryId: answers.value[i].inquiryId,
        interId: 0,
        score: -1,
        text: String(answers.value[i].text),
      })
    } else {
      formData.value.push({
        // userId: userStore.userInfo.userId,
        inquiryId: questionItem.value[i].inquiryId,
        interId: 0,
        score: answers.value[i].score,
      })
    }
  }

  if (formData.value.length < questionItem.value) {
    toast.error('请完成所有题目')
    return
  }
  console.log(formData.value)
  const res = await submitInquiry(formData.value)
  if (res.code === 200) {
    toast.close()
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        uni.switchTab({ url: '/pages/home/home' })
      },
    })
  }
}
</script>

<style>
.con {
  /* box-sizing: border-box;
  height: 100vh; */
  /* padding: 20px; */

  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom right, #e6f3ff, #f0ffe6);
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 25%;
  margin-bottom: 40px;
}

.header-item {
  font-size: 14px;
  color: #999;
}

.header-item.active {
  position: relative;
  color: #007aff;
}

.header-item.active::after {
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 6px;
  height: 6px;
  content: '';
  background-color: #007aff;
  border-radius: 50%;
  transform: translateX(-50%);
}

.content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.description {
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
}

.gender-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gender-button {
  padding: 10px;
  font-size: 16px;
  text-align: center;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.selected {
  color: #fff;
  background-color: #007aff;
}

.check_group {
  padding: 0;
  background-color: rgba(255, 255, 255, 0);
}
</style>
