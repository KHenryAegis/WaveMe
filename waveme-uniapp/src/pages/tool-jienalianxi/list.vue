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
      title="接纳练习"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="title">我的收件箱</view>
      <view v-for="(jiena, index) in jienaList" :key="index">
        <view class="box" @click="selectJiena(index)">
          <view style="font-size: 18px; color: gray">{{ jiena.date }}</view>
          <view style="font-size: 20px; font-weight: bold">给我的信</view>
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
import { getAllUserJienalianxi, IJienalianxiReturn } from '@/service/index/jienalianxi'
import { useMessage, useToast } from 'wot-design-uni'

const toast = useToast()
const message = useMessage()
const jienaList = ref<IJienalianxiReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserJienalianxi()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    jienaList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})

const goBack = () => {
  uni.navigateBack()
}
const selectJiena = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(jienaList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-jienalianxi/jienaDetail?detail=${detailObject}`,
  })
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.title {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
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
</style>
