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
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="正念练习：旅行手记"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="title">识别回避应对方式</view>
      <view class="font">我的回避档案</view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">1.首先，为这种应对方式取个名字</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.huibiName" placeholder="名字是最短的咒语" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">2.引发情绪的情境或事件：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.qingjing" placeholder="当时发生了什么……" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">3.产生了什么感受：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.ganshou" placeholder="焦虑，沮丧，恐惧，或者别的什么?" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">4.为了对抗这种感觉，你做了什么尝试?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.changshi" placeholder="你是怎么做的?" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">5.这种尝试给你带来了什么长期影响?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.yingxiang" placeholder="达到自己的目标了吗?" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">6.下一次，你希望自己怎么做?</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.zenme" placeholder="你期待自己怎么做?" />
        </view>
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">存入档案</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitHuibidangan, IHuibidangan } from '@/service/index/huibidangan'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const submitObj = ref<IHuibidangan>({
  userId: '',
  date: '',
  huibiName: '',
  qingjing: '',
  ganshou: '',
  changshi: '',
  yingxiang: '',
  zenme: '',
})

const message = useMessage()
const userStore = useUserStore()
const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]
  const res = await submitHuibidangan(submitObj.value)
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
}

.font {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.title {
  margin-top: 12px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
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
</style>
