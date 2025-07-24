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
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="应对计划"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">坏情绪应对计划</view>
      <view v-for="(yingdui, index) in yingduiList" :key="index">
        <view class="box" @click="selectJiazhi(index)">
          <view style="font-size: 20px; font-weight: bold">{{ yingdui.date }}</view>
          <view style="font-size: 20px; font-weight: bold">{{ yingdui.jihuaName }}</view>
          <image
            src="http://115.159.83.61:9000/tool/tool-list.png"
            style="width: 45px; height: 45px"
          />
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { getAllUserYingduijihua, IYingduijihuahuaReturn } from '@/service/index/yingduijihua'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const userStore = useUserStore()
const toast = useToast()
const message = useMessage()
const yingduiList = ref<IYingduijihuahuaReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserYingduijihua()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    yingduiList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})

const goBack = () => {
  uni.navigateBack()
}
const selectJiazhi = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(yingduiList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-yingduijihua/yingduiDetail?detail=${detailObject}`,
  })
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: auto;
  padding: 12px 25px 12px 25px;
  margin: 15px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
}

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.left_box {
  display: flex;
  width: 80%;
}

.right_box {
  display: flex;
  justify-content: center;
  width: 20%;
}

.text-area {
  display: flex;
  flex-direction: column;
  width: 75%;
}

.siwei-name {
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
  text-overflow: elipsis;
  white-space: nowrap;
}
</style>
