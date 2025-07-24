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
    <wd-navbar fixed safeAreaInsetTop left-text="返回" left-arrow @click-left="goBack"></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view v-for="(sanjian, index) in sanjianList" :key="index">
        <view class="box" @click="selectSanjian(index)">
          <view style="font-size: 18px; color: gray">{{ sanjian.date }}</view>
          <img :src="sanjian.statusUrl" style="width: 50px; height: 50px" />
        </view>
      </view>
    </view>

    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { getAllUserSanjianxiaoshi, ISanjianxiaoshiReturn } from '@/service/index/sanjianxiaoshi'
import { useMessage, useToast } from 'wot-design-uni'

const toast = useToast()
const message = useMessage()
const sanjianList = ref<ISanjianxiaoshiReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserSanjianxiaoshi()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    sanjianList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})

const goBack = () => {
  uni.navigateBack()
}
const selectSanjian = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(sanjianList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-sanjianxiaoshi/sanjianDetail?detail=${detailObject}`,
  })
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.font {
  margin-top: 8px;
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
