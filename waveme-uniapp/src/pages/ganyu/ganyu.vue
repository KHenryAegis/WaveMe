<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '干预测试',
  },
}
</route>
<template>
  <view>
    <view
      class="bg-white pt-2 px-4"
      :style="{ marginTop: safeAreaInsets?.top + 'px' }"
      w-full
      h-full
    >
      <wd-navbar title="干预" left-arrow @click-left="ToHome()"></wd-navbar>
      <view class="middle-container">
        <view class="content" :style="{ height: contentHeight + 'px' }">
          <view>
            {{ questions[currQuestion - 1].content }}
          </view>
          <view style="display: flex; justify-content: center">
            <wd-img
              :width="200"
              :height="200"
              :src="questions[currQuestion - 1].url"
              :enable-preview="true"
            />
          </view>
          <view style="width: 100%; height: 800px; background-color: yellow"></view>
          <view style="width: 100%; height: 10px; background-color: red"></view>
          <view style="width: 100%; height: 80px; background-color: blue"></view>
        </view>

        <view class="fixed-bottom">
          <wd-radio-group
            v-model="currAnswer"
            shape="dot"
            @change="handleRadioChange"
            v-if="questions[currQuestion - 1].questionType == 'select'"
            size="large"
          >
            <wd-radio v-for="(currOption, index) in currOptions" :key="index" :value="currOption">
              {{ currOption }}
            </wd-radio>
          </wd-radio-group>
          <wd-textarea
            v-model="currAnswer"
            placeholder="请填写想法"
            @change="handelInputChange"
            v-if="questions[currQuestion - 1].questionType == 'fill'"
            clearable
          />

          <wd-pagination
            v-model="currQuestion"
            :total-page="questions.length"
            @change="handlePageChange"
            show-icon
          ></wd-pagination>
        </view>
      </view>

      <view class="submit-btn">
        <wd-button type="success" @click="submit" v-if="isFinish">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getPagesByInterId, IQuestionItem, submitInter, ISubmitInter } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useInterStore } from '@/store/inter'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const systemInfo = uni.getSystemInfoSync()
const contentHeight = systemInfo.windowHeight - safeAreaInsets.top - 120
const userStore = useUserStore()
const interStore = useInterStore()

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const currQuestion = ref<number>(1)
const currAnswer = ref<string>()
const currOptions = ref([])
const answers = ref(new Map())
const interId = ref<number>()
const questions = ref<IQuestionItem[]>([])
const isEmpty = ref<boolean>(false)
const isFinish = computed(() => {
  for (let i = 0; i < answers.value.size; i++) {
    const value = answers.value.get(i)
    if (value === '' || value === null || value === undefined) {
      return false
    }
  }
  if (questions.value.length <= 0 || questions.value.length !== answers.value.size) {
    return false
  }
  return true
})

onLoad((options) => {
  interId.value = options.interId
  getQuestion()
})

onUnload(() => {
  storeInter()
})

const getQuestion = async () => {
  const res = await getPagesByInterId(interId.value)
  console.log(res)
  questions.value = res.data
  if (questions.value[currQuestion.value - 1].questionType === 'select') {
    currOptions.value = questions.value[currQuestion.value - 1].options.split(';')
  }
  checkIfUnfinished()
}

const handlePageChange = ({ value }) => {
  currQuestion.value = value
  currAnswer.value = ''
  if (questions.value[currQuestion.value - 1].questionType === 'select') {
    currOptions.value = questions.value[currQuestion.value - 1].options.split(';')
  } else {
    currOptions.value = []
  }

  if (answers.value.has(currQuestion.value - 1)) {
    currAnswer.value = answers.value.get(currQuestion.value - 1)
  }
}

const handelInputChange = ({ value }) => {
  currAnswer.value = value
  answers.value.set(currQuestion.value - 1, currAnswer.value)
  console.log(answers.value)
}

const handleRadioChange = () => {
  answers.value.set(currQuestion.value - 1, currAnswer.value)
  console.log(answers.value)
}

const submit = async () => {
  const jsonObject = Object.fromEntries(answers.value)
  const res = await submitInter({
    userId: userStore.userInfo.userId,
    interId: interId.value,
    endTime: getFormattedDate(),
    answers: jsonObject,
  })
  if (res.code === 200) {
    const userInfo = userStore.userInfo
    userInfo.currProgress = userInfo.currProgress + 1
    ToHome()
  }
}

const checkIfUnfinished = () => {
  const interStatus = interStore.interInfo
  console.log(interStatus)
  if (interStatus.interId != null && interStatus.answers != null) {
    answers.value = new Map(interStatus.answers)
    if (answers.value.has(currQuestion.value - 1)) {
      currAnswer.value = answers.value.get(currQuestion.value - 1)
    }
  }
}

const storeInter = () => {
  const interStatus = {
    interId: interId.value,
    answers: answers.value,
  }

  interStore.setInterInfo(interStatus)
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.middle-container {
  display: flex;
  flex-direction: column;
  height: 80vh; /* 容器高度设置为视口高度 */
}

.fixed-bottom {
  z-index: 1000; /* 确保底部栏在最上面 */
  flex-shrink: 0; /* 防止底部栏在缩小时被压缩 */
}

.content {
  flex-grow: 1; /* 允许中间内容区域填充剩余空间 */
  padding: 10px; /* 根据需要添加内边距 */
  overflow-y: scroll;
}

.submit-btn {
  position: absolute;
  right: 15px;
}
</style>
