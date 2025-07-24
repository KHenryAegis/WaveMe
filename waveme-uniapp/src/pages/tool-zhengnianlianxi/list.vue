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
      title="我的旅行手记"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">我的旅行手记</view>
      <view v-for="(zhengnian, index) in zhengnianList" :key="index">
        <view class="box" @click="selectZhengNian(index)">
          <view style="font-size: 16px; color: gray">{{ zhengnian.date }}</view>
          <view style="font-size: 16px; color: gray">手记</view>
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
import { getAllUserZhengnianlianxi, IZhengnianlianxiReturn } from '@/service/index/zhengnianlianxi'
import { useMessage, useToast } from 'wot-design-uni'

const toast = useToast()
const message = useMessage()
const zhengnianList = ref<IZhengnianlianxiReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserZhengnianlianxi()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    zhengnianList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})

const goBack = () => {
  uni.navigateBack()
}
const selectZhengNian = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(zhengnianList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-zhengnianlianxi/zhengnianDetail?detail=${detailObject}`,
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
