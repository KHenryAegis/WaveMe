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
    <wd-navbar fixed safeAreaInsetTop title="应对计划" left-arrow @click-left="goBack"></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/yingduijihua/yingduijihua1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">给你的应对计划起个名字：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.jihuaName" placeholder="比如，焦虑应对" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">
          1
          触发情境：什么时刻、发生什么事情可能会让你陷入糟糕的情绪状态？这可能不是一个具体的事情，而是一类相似的情境，想一想，写下来
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.qingjing" placeholder="输入触发情境" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">
          2
          惯常的应对策略：当糟糕的消极情绪产生，你最有可能采取什么样的应对行为？可以想想第四站里你在回避档案里写下的那些，也可以重新总结
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.celue" placeholder="输入惯常的应对策略" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">
          3 新的替代反应：
          你打算运用哪些新技能来代替上面的惯常应对策略？可以从短期和长期两个角度来思考：当你有糟糕感受的时候，有什么你立刻就能做并且可以起作用的？在平时，有哪些技能可以被发展为习惯，从而对你产生长期帮助？
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.duanqi" placeholder="输入短期应对策略" />
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.changqi" placeholder="输入长期应对策略" />
        </view>
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">存入手册</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitYingduijihua, IYingduijihua } from '@/service/index/yingduijihua'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const submitObj = ref<IYingduijihua>({
  userId: '',
  date: '',
  jihuaName: '',
  qingjing: '',
  celue: '',
  duanqi: '',
  changqi: '',
})
const userStore = useUserStore()
const message = useMessage()

const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]

  const res = await submitYingduijihua(submitObj.value)
  if (res.code === 200) {
    uni.navigateBack({ delta: 1 })
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
