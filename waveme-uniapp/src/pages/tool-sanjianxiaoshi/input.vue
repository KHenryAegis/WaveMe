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
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/sanjianxiaoshi/sanjianxiaoshi1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">第一件事：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.one" placeholder="..." />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">第二件事：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.two" placeholder="..." />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">第三件事：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.three" placeholder="..." />
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
          src="http://115.159.83.61:9000/tool/sanjianxiaoshi/sanjianxiaoshi2.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>

      <view class="select-btns">
        <view
          v-for="(status, index) in statusList"
          :key="index"
          class="select-btn"
          :class="{ selected: selectedItem === index }"
          @click="selectItem(index)"
        >
          <image :src="status.iconUrl" mode="aspectFit" style="width: 100%" />
        </view>
      </view>

      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">添加到日记</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitSanjianxiaoshi, ISanjianxiaoshi } from '@/service/index/sanjianxiaoshi'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const currIndex = ref<number>(0)
const statusList = ref([
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon1.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon2.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon3.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon4.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon5.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon6.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon7.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon8.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon9.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon10.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon11.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon12.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon13.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon14.png',
  },
  {
    iconUrl: 'http://115.159.83.61:9000/tool/sanjianxiaoshi/icon15.png',
  },
])
const submitObj = ref<ISanjianxiaoshi>({
  userId: '',
  date: '',
  statusUrl: '',
  one: '',
  two: '',
  three: '',
})
const userStore = useUserStore()
const message = useMessage()
const selectedItem = ref<number>(-1)

const toNext = () => {
  currIndex.value = currIndex.value + 1
}

const selectItem = (index) => {
  selectedItem.value = index
  submitObj.value.statusUrl = statusList.value[index].iconUrl
}

const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]
  console.log(submitObj.value)

  const res = await submitSanjianxiaoshi(submitObj.value)
  if (res.code === 200) {
    uni.redirectTo({
      url: '/pages/tool-sanjianxiaoshi/sanjianxiaoshi',
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
