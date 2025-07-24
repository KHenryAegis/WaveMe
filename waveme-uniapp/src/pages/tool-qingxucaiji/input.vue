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
    <wd-navbar fixed safeAreaInsetTop title="情绪采集" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/tool/qingxucaiji/qingxucaiji1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">开始记录</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/qingxucaiji/qingxucaiji2.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="mood-container">
        <view class="mood-font" v-for="(mood, index) in moodList" :key="index">
          <img
            :src="mood.iconUrl"
            style="width: 50px; height: 50px"
            @click="selectMood(mood.iconUrl, mood.desc)"
          />
          <view>{{ mood.desc }}</view>
        </view>
      </view>
      <view style="margin: 25px auto; font-size: 25px; font-weight: bold; text-align: center">
        我感到{{ submitObj.feelingName }}
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第三步 -->
    <view class="main-container" v-show="currIndex === 2">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/qingxucaiji/qingxucaiji3.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">这种情绪的认知成分是：</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.renzhi"
            placeholder="在这种情绪状态中，你的所思所想是什么？"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">这种情绪的行为成分是：</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.xingwei"
            placeholder="这种情绪状态会驱使你采取什么行动？"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">这种情绪的生理成分是：</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.shengli"
            placeholder="在这种情绪状态中，你有怎样的身体感觉？"
          />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第四步 -->
    <view class="main-container" v-show="currIndex === 3">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/qingxucaiji/qingxucaiji4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">发生了什么使得我产生了这种情绪？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.chansheng" placeholder="情绪诱发线索" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">我是怎么应对这种情绪的？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.yingdui" placeholder="情绪应对方式" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">这种应对方式起效了吗？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.qixiao" placeholder="应对效果" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第五步 -->
    <view class="main-container" v-show="currIndex === 4">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/tool/qingxucaiji/qingxucaiji5.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/back.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">返回任务主页</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitQingxucaiji, IQingxucaiji } from '@/service/index/qingxucaiji'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const currIndex = ref<number>(0)
const selectMood = (url: string, name: string) => {
  submitObj.value.feelingUrl = url
  submitObj.value.feelingName = name
}
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
const submitObj = ref<IQingxucaiji>({
  userId: '',
  date: '',
  feelingUrl: '',
  feelingName: '',
  renzhi: '',
  xingwei: '',
  shengli: '',
  chansheng: '',
  yingdui: '',
  qixiao: '',
})
const userStore = useUserStore()
const message = useMessage()

const toNext = () => {
  currIndex.value = currIndex.value + 1
}

const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]

  const res = await submitQingxucaiji(submitObj.value)
  if (res.code === 200) {
    uni.redirectTo({
      url: '/pages/tool-qingxucaiji/qingxucaiji',
    })
  } else {
    message.alert('网络错误！')
  }
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* margin-top: 30rpx; */
  /* padding: 10px; */
}

.middle-img-common {
  width: 100%;
  height: auto;
}

.input-area {
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 15px 0 20px 0;
}

.mood-container {
  display: flex;
  justify-content: space-around;
}

.mood-font {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
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
</style>
