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
    <wd-navbar fixed safeAreaInsetTop title="自动思维" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey2/renwu7.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">回想你最近情绪不佳的一个时刻，那时候发生了什么？</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.qingjing"
            placeholder="什么时候，什么地点，发生了什么事情?"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">你有什么样的感受？</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.ganshou"
            placeholder="情绪是什么样的？沮丧，自责，失去希望，焦虑，生气……"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">背后的自动思维是什么？</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="submitObj.zidongsiwei"
            placeholder="仔细想想，之所以有上面的感受，是因为产生了什么与自己有关的想法或解释？，你可以用“我是……的”为开头，来描述自动思维"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">产生了什么后续影响？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="houxuyingxiang" placeholder="有什么行为结果或后续影响？" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey2/renwu8.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.siweiName" placeholder="..." />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第三步 -->
    <view class="main-container" v-show="currIndex === 2">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey2/renwu9.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view class="select-btns">
          <view
            v-for="(monster, index) in selectUrls"
            :key="index"
            class="select-btn"
            :class="{ selected: selectedItem === index }"
          >
            <image :src="monster" @click="selectItem(index)" mode="aspectFit" style="width: 100%" />
          </view>
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第四步 -->
    <view class="main-container" v-show="currIndex === 3">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/zidongsiwei/step4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.ruheshibie" placeholder="..." />
        </view>
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">完成，存入封印册！</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitZidongsiwei, IZidongsiwei } from '@/service/index/zidongsiwei'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const currIndex = ref<number>(0)
const submitObj = ref<IZidongsiwei>({
  userId: '',
  date: '',
  qingjing: '',
  ganshou: '',
  zidongsiwei: '',
  houxuyingxiang: 'wwwwwwww',
  siweiName: '',
  monsterUrl: '',
  ruheshibie: '',
})
const userStore = useUserStore()
const message = useMessage()
const selectUrls = ref([
  'http://115.159.83.61:9000/journey2/renwu10.png',
  'http://115.159.83.61:9000/journey2/renwu11.png',
  'http://115.159.83.61:9000/journey2/renwu12.png',
  'http://115.159.83.61:9000/journey2/renwu13.png',
  'http://115.159.83.61:9000/journey2/renwu14.png',
  'http://115.159.83.61:9000/journey2/renwu18.png',
  'http://115.159.83.61:9000/journey2/renwu19.png',
  'http://115.159.83.61:9000/journey2/renwu20.png',
  'http://115.159.83.61:9000/journey2/renwu21.png',
  'http://115.159.83.61:9000/journey2/renwu22.png',
])
const selectedItem = ref<number>(0)
const houxuyingxiang = ref<string>('')

const selectItem = (index) => {
  selectedItem.value = index
  submitObj.value.monsterUrl = selectUrls.value[selectedItem.value]
}
const toNext = () => {
  currIndex.value = currIndex.value + 1
}
const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]
  submitObj.value.houxuyingxiang = houxuyingxiang.value

  const res = await submitZidongsiwei(submitObj.value)
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
