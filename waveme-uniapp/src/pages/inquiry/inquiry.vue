<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '干预测试',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="问卷"></wd-navbar>

    <view class="con px-2">
      <view style="height: 10%"></view>

      <view class="mt-8">
        <wd-progress :percentage="curPer" />
      </view>
      <!-- 问题 -->
      <view class="question mt-4">
        <p v-if="questions[curId - 1]?.subtitle != null" class="font-800 text-xl">
          {{ questions[curId - 1]?.subtitle }}
        </p>
        <view class="mt-4" style="font-size: 18px">
          <text class="">{{ questions[curId - 1]?.question }}</text>
        </view>
      </view>

      <wd-toast />

      <!-- 选项列表 -->
      <!-- <view class="options" style="background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6)">
        <wd-radio-group v-model="answers[curId - 1]" cell>
          <view
            class="option"
            v-for="option in questions[curId - 1]?.options"
            :key="option.score"
            style="background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6)"
          >
            <wd-radio :value="option.score">{{ option.text }}</wd-radio>
          </view>
        </wd-radio-group>
      </view> -->

      <!-- 选择题 -->
      <view class="options" v-if="questions[curId - 1]?.type === 0">
        <view
          class="option"
          v-for="option in questions[curId - 1]?.options"
          :key="option.text"
          :class="{ selected: answers[curId - 1] === option.score }"
          @click="selectOption(option.score)"
        >
          {{ option.text }}
        </view>
      </view>

      <!-- 填空题 -->
      <view class="options" v-if="questions[curId - 1]?.type === 1">
        <wd-textarea
          v-model="answers[curId - 1]"
          placeholder="请在这里输入..."
          custom-class="textarea"
        />
      </view>

      <!-- 选择0-8题 -->
      <view class="flex justify-center">
        <view class="options" v-if="questions[curId - 1]?.type === 2" style="width: 75%">
          <view class="">
            <wd-slider v-model="answers[curId - 1]" min="0" max="8" />
          </view>
        </view>
      </view>

      <!-- 选择1-9题 -->
      <view class="flex justify-center">
        <view class="options" v-if="questions[curId - 1]?.type === 3" style="width: 75%">
          <view class="">
            <wd-slider v-model="answers[curId - 1]" min="1" max="9" />
          </view>
        </view>
      </view>

      <view class="flex justify-center">
        <view class="options" v-if="questions[curId - 1]?.type === 4" style="width: 75%">
          <view class="">
            <wd-slider v-model="answers[curId - 1]" min="0" max="100" />
            <!-- <p>（注：单位为百分比）</p> -->
          </view>
        </view>
      </view>

      <view class="flex justify-center">
        <view class="options" v-if="questions[curId - 1]?.type === 5" style="width: 75%">
          <view class="">
            <wd-slider v-model="answers[curId - 1]" min="0" max="10" @dragstart="dragSilder" />
          </view>
        </view>
      </view>

      <view class="flex justify-center">
        <view class="options" v-if="questions[curId - 1]?.type === 6" style="width: 75%">
          <view class="">
            <wd-slider v-model="answers[curId - 1]" min="0" max="8" />
          </view>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="bottom-btn">
        <!-- <view class="circle">
          <text class="arrow"></text>
        </view>
        <text>上一题</text> -->
        <wd-button @click="changeLast" v-if="curId != 1">上一题</wd-button>
        <!-- <wd-button @click="changeNext" v-if="curId != queLen" :disabled="!optionFlag">
          下一题
        </wd-button> -->
        <wd-button @click="changeNext" v-if="curId != queLen">下一题</wd-button>
        <wd-button @click="submit" v-if="curId == queLen" :disabled="!optionFlag">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getInquiryByPos, submitInquiry, InquiryResultArray } from '@/service/ganyu/inquiry'
import { useInquiryStore } from '@/store/inquiry'
import { useInterStore } from '@/store/inter'
import { useToast, useNotify } from 'wot-design-uni'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'tool',
})

const userStore = useUserStore()
const toast = useToast()
const interStore = useInterStore()
const position = ref('1-post')
const inquiryStore = useInquiryStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const systemInfo = uni.getSystemInfoSync()
const contentHeight = systemInfo.windowHeight - safeAreaInsets.top - 100

const queLen = ref()
const curId = ref(1)
const curPer = ref(0)

const curGroup = ref(1)
const islastFlag = ref(false)
const currQuestion = ref<number>(1)
const currAnswer = ref<string>()
const currOptions = ref([])
// const answers = ref(new Map())
const value = ref()
const answers = ref({})
const questions = ref([])
const pageQuestions = ref([])
const interId = ref()
const storageFlag = ref(false)

// 选了才能解锁下一题
const optionFlag = ref(false)

watch(curId, (newVal) => {
  console.log('newVal', newVal)
  console.log('answers', answers.value)

  curPer.value = parseInt(((newVal / queLen.value) * 100).toFixed(0))
})

onLoad(async (param) => {
  // 修改，从缓存拿到当前第几站

  toast.loading('加载中')

  position.value = param.position

  console.log('position', position.value)

  // 如果是第二套，interId要取余

  // if(userStore.userInfo.groupId==1){
  //   interId.value
  // }

  interId.value = parseInt(param.position.split('-')[0])

  console.log('interId.value', interId.value)

  // position.value = '1-post'

  loadStorage()

  // interId.value = parseInt(param.interId)

  console.log('请求getInquiryByPos')
  let res
  try {
    res = await getInquiryByPos(position.value)
  } catch {
    toast.error('获取问卷失败')
    uni.switchTab({
      url: '/pages/home/home',
    })
  }

  toast.close()
  questions.value = res.data
  questions.value.forEach((item) => {
    item.options = JSON.parse(item.options)
  })
  console.log(questions.value)
  queLen.value = questions.value.length

  if (!storageFlag.value) {
    questions.value.forEach((item, index) => {
      if (item.type === 0) {
        answers.value[index] = -1
      } else {
        answers.value[index] = ''
      }
    })
  } else {
    // 找到上次没有回答的题目
    const firstUnanswered = Object.keys(answers.value).find((key) => {
      const question = questions.value[key]
      return (
        (question.type === 0 && answers.value[key] === -1) ||
        (question.type === 1 && answers.value[key] === '')
      )
    })
    if (firstUnanswered !== undefined) {
      curId.value = parseInt(firstUnanswered) + 1
    }
  }
  curPer.value = parseInt(((curId.value / queLen.value) * 100).toFixed(0))

  console.log(curId.value)
  console.log(queLen.value)
})

const dragSilder = (e) => {
  optionFlag.value = true
}

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const changeNext = () => {
  // 检查是否填写

  if (answers.value[curId.value - 1] === '') {
    toast.error('请填写答案')
    return
  }

  if (answers.value[curId.value - 1] === -1) {
    toast.error('请选择答案')
    return
  }

  curId.value++
  // Save the current answers to the store
  inquiryStore.AnsInfo.positions[position.value] = answers.value

  // todo:后面完善不同的题型

  // if (answers.value[curId.value - 1] === -1) {
  //   optionFlag.value = false
  // }

  // if (answers.value[curId.value - 1] === '') {
  //   optionFlag.value = false
  // }

  // inquiryStore.setInquiryInfo(inquiryStore.AnsInfo)
}

const changeLast = () => {
  curId.value = curId.value - 1
  console.log(curId.value)

  optionFlag.value = true
}

const selectOption = (score: number) => {
  console.log(score)
  answers.value[curId.value - 1] = score

  optionFlag.value = true
}
// const formData = ref<InquiryResultArray>([
//   { userId: '1', inquiryId: 1, position: '2-pre', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
// ])

const submit = async () => {
  if (answers.value[curId.value - 1] === '') {
    toast.error('请填写答案')
    return
  }

  if (answers.value[curId.value - 1] === -1) {
    toast.error('请选择答案')
    return
  }
  toast.loading('正在提交...')
  // const answersString = Array.from(answers.value.values()).join(';')
  // console.log(answersString)
  console.log('anwser', answers.value)
  const formData = ref([])

  for (let i = 0; i < queLen.value; i++) {
    const answer = answers.value[i]
    if (typeof answer === 'number') {
      formData.value.push({
        inquiryId: questions.value[i].inquiryId,
        interId: interId.value,
        score: answer,
      })
    } else if (typeof answer === 'string') {
      formData.value.push({
        inquiryId: questions.value[i].inquiryId,
        interId: interId.value,
        score: -1,
        text: answer,
      })
    }
  }

  if (formData.value.length < queLen.value) {
    toast.error('请完成所有题目')
    return
  }
  console.log(formData.value)
  try {
    const res = await submitInquiry(formData.value)
    if (res.code === 200) {
      toast.close()
      // 清除缓存

      inquiryStore.AnsInfo.positions[position.value] = {}

      // 如果是pre 提交后跳转到正页
      if (position.value.includes('pre')) {
        uni.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            uni.redirectTo({
              url:
                '/pages/journey_common/start_journey?progress=' + encodeURIComponent(interId.value),
            })
          },
        })
      }
      if (position.value.includes('post')) {
        uni.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            uni.redirectTo({
              url: '/pages/inquiry/end',
            })
          },
        })
      }
    }
  } catch (e) {
    toast.close()
  }
}

const loadStorage = () => {
  console.log('inquiryStore.AnsInfo', inquiryStore.AnsInfo)
  const storedAnswers = inquiryStore.AnsInfo.positions[position.value]
  console.log('storedAnswers', storedAnswers)
  if (Object.keys(storedAnswers).length === 0 && storedAnswers.constructor === Object) {
    console.log('No stored answers found')
  } else {
    console.log('加载缓存')

    answers.value = storedAnswers
    console.log('ans', answers.value)

    storageFlag.value = true
  }
}
</script>

<style>
.con {
  /* background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6); */
  background: linear-gradient(90deg, rgba(171, 236, 214, 0.29) 0%, rgba(251, 237, 150, 0.29) 100%);
}

.con {
  display: flex;
  flex: 1;
  flex-direction: column;
  /* gap: 15px; */
  height: 100vh;
  overflow: hidden;
  /* padding-top: 1.25rem;
  margin-top: 3rem; */
  /* overflow-y: scroll; */
  background: linear-gradient(90deg, rgba(171, 236, 214, 0.29) 0%, rgba(251, 237, 150, 0.29) 100%);
}

.main-title-color {
  color: #d14328;
}

.back {
  margin-right: 10px;
  font-size: 24px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.selected {
  background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
}

.progress-bar {
  height: 10px;
  margin-bottom: 5px;
  overflow: hidden;
  background-color: #e0e0e0;
  border-radius: 5px;
}

.progress {
  height: 100%;
  background-color: #007aff;
}

.progress-text {
  margin-bottom: 20px;
  font-size: 14px;
  color: #888;
  text-align: right;
}

.question {
  margin-bottom: 20px;
  font-size: 16px;
}

.options {
  margin-bottom: 30px;
}

.option {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.bottom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: 2px solid #000;
  border-radius: 50%;
}

.arrow {
  font-size: 20px;
}

.textarea {
  border-radius: 8px;
}
</style>
