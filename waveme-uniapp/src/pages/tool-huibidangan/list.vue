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
      title="我的回避档案"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">我的回避档案</view>
      <view v-for="(huibi, index) in huibiList" :key="index">
        <view class="box" @click="selectHuibi(index)">
          <view style="font-size: 18px; color: gray">{{ index }}</view>
          <view style="font-size: 20px; font-weight: bold">{{ huibi.huibiName }}</view>
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
import { getAllUserHuibidangan, IHuibidanganReturn } from '@/service/index/huibidangan'
import { useMessage, useToast } from 'wot-design-uni'

const toast = useToast()
const message = useMessage()
const huibiList = ref<IHuibidanganReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserHuibidangan()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    huibiList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})

const goBack = () => {
  uni.navigateBack()
}
const selectHuibi = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(huibiList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-huibidangan/huibiDetail?detail=${detailObject}`,
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
