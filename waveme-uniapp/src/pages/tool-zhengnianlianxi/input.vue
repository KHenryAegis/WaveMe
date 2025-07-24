<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="正念练习" left-arrow @click-left="goBack"></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">正念练习：旅行手记</view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">1.引发消极情绪的情境是什么?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.qingjing" placeholder="发生了什么?" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">2.一开始的情绪是什么样子的?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.qingxu" placeholder="最初的情绪是……" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">3.尝试正念接纳后， 情绪是否有变化?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.bianhua" placeholder="正念接纳带来了什么改变?" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">4.情绪发生了怎样的变化?</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.zenyang"
            placeholder="或许情绪软化了一些? 或许变成了另外的情绪?"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">5.对于整个过程，你的感受是什么?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.ganshou" placeholder="有什么样的感悟和体验?" />
        </view>
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">保存手记</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitZhengnianlianxi, IZhengnianlianxi } from '@/service/index/zhengnianlianxi'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const submitObj = ref<IZhengnianlianxi>({
  userId: '',
  date: '',
  qingjing: '',
  qingxu: '',
  bianhua: '',
  zenyang: '',
  ganshou: '',
})

const message = useMessage()
const userStore = useUserStore()
const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]
  const res = await submitZhengnianlianxi(submitObj.value)
  if (res.code === 200) {
    uni.navigateBack({ delta: 2 })
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
}

.input-area {
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
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
</style>
