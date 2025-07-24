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
    <wd-navbar fixed safeAreaInsetTop title="价值手册" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey6/renwu4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">我选择的生活领域是：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.lingyu" placeholder="请输入你选择的生活领域……" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey6/renwu5.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">
          对于我所选择的生活领域，我的价值是 （尝试用最多三个词或短句来描述）：
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.miaoshu" placeholder="请输入你的价值描述……" />
        </view>
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
          src="http://115.159.83.61:9000/journey6/renwu6.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">对于你输入的每个价值，你打算怎么做来实现他们？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.yitu" placeholder="你的价值意图是？" />
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
          src="http://115.159.83.61:9000/journey6/renwu7.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">
          基于已经填写的价值和价值意图，你正在做对你来说重要的事情吗？
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.pingjia" placeholder="我的评价是……" />
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
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey6/renwu8.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">是什么鼓励你实现价值， 又是什么阻碍你实现价值？</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.shiqing"
            placeholder="那些鼓励或者阻碍我实现价值的事情是……"
          />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">完成我的手册</view>
      </view>
    </view>

    <!-- 第六步 -->
    <view class="main-container" v-show="currIndex === 5">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/journey6/renwu9.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/back.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">返回工具箱主页</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitJiazhishouce, IJiazhishouce } from '@/service/index/jiazhishouce'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const currIndex = ref<number>(0)
const submitObj = ref<IJiazhishouce>({
  userId: '',
  date: '',
  lingyu: '',
  miaoshu: '',
  yitu: '',
  pingjia: '',
  shiqing: '',
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

  const res = await submitJiazhishouce(submitObj.value)
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
