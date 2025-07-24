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
    <wd-navbar fixed safeAreaInsetTop title="接纳练习" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/journey5/renwu3.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">开始接纳体验</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey5/renwu4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view style="text-align: center">
          <audio
            style="text-align: left"
            src="https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3"
            :poster="audioPlayer.poster"
            :name="audioPlayer.name"
            :author="audioPlayer.author"
            :action="audioAction"
            controls
          ></audio>
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">我完成啦</view>
      </view>
    </view>

    <!-- 第三步 -->
    <view class="main-container" v-show="currIndex === 2">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/tool/jienalianxi/jienalianxi1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第四步 -->
    <view class="main-container" v-show="currIndex === 3">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/journey5/renwu8.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">去写信</view>
      </view>
    </view>

    <!-- 第五步 -->
    <view class="main-container" v-show="currIndex === 4">
      <view style="height: 15%"></view>
      <view class="title">一封给你的信</view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">给：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.name" placeholder="你的名字或昵称" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">我知道，当：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.qingjing" placeholder="引发消极情绪的情境" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">你会感觉：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.ganshou" placeholder="你的感受和想法" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">你会：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.xingdong" placeholder="你的行动" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">然而，我知道：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.zhidao" placeholder="想对你说的话" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">我想告诉你：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.gaosu" placeholder="想对你说的话" />
        </view>
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">寄出你的信</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitJienalianxi, IJienalianxi } from '@/service/index/jienalianxi'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const submitObj = ref<IJienalianxi>({
  userId: '',
  date: '',
  name: '',
  qingjing: '',
  ganshou: '',
  xingdong: '',
  zhidao: '',
  gaosu: '',
})

const audioPlayer = ref({
  poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
  name: '致爱丽丝',
  author: '暂无',
})
const audioAction = ref({
  method: 'pause',
})

const message = useMessage()
const userStore = useUserStore()
const currIndex = ref<number>(0)
const goBack = () => {
  uni.navigateBack()
}

const toNext = () => {
  currIndex.value = currIndex.value + 1
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]
  const res = await submitJienalianxi(submitObj.value)
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

.title {
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
