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

    <!-- 普通页面 -->
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/tool/jiazhishouce/jiazhishouce1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>

      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">开启手册</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const toNext = () => {
  uni.navigateTo({
    url: '/pages/tool-jiazhishouce/catching',
  })
}

const goBack = () => {
  uni.navigateBack()
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

.middle-img-common {
  width: 100%;
  height: auto;
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
