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
      v-if="navbarTitle"
      fixed
      safeAreaInsetTop
      :title="navbarTitle"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img">
        <image
          src="http://115.159.83.61:9000/common/daolanStart.png"
          mode="scaleToFill"
          style="width: 100%"
        />
      </view>
      <view class="operation-area">
        <wd-button type="success" @click="toDaolan">出发</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'

const interStore = useInterStore()
const navbarTitle = ref<string>('')
onShow(() => {
  const interId = interStore.interInfo.interId
  if (interId % 8 === 1) {
    navbarTitle.value = '第一站: 导入'
  } else if (interId % 8 === 2) {
    navbarTitle.value = '第二站: 导入'
  } else if (interId % 8 === 3) {
    navbarTitle.value = '第三站: 导入'
  } else if (interId % 8 === 4) {
    navbarTitle.value = '第四站: 导入'
  } else if (interId % 8 === 5) {
    navbarTitle.value = '第五站: 导入'
  } else if (interId % 8 === 6) {
    navbarTitle.value = '第六站: 导入'
  } else if (interId % 8 === 7) {
    navbarTitle.value = '第七站: 导入'
  }
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const toDaolan = async () => {
  const res = await interStore.addPageIndex()
  if (res === 'pageEnd') {
    return
  }
  uni.navigateTo({
    url: '/pages/journey_common/daolanHome',
  })
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 10px 0 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img {
  width: 100%;
  height: 60%;
  overflow-y: scroll;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25%;
}
</style>
