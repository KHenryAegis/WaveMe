<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="专注当下" left-arrow @click-left="goBack"></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/zhuanzhudangxia/breath.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view style="text-align: center">
          <audio
            style="text-align: left"
            src="https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3"
            :poster="audioPlayer.poster"
            :name="audioPlayer.name"
            :author="audioPlayer.author"
            :action="audioAction"
            controls
          ></audio>
        </view>
      </view>
      <view @click="doStart" class="operation-area">
        <img src="http://115.159.83.61:9000/common/back.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">我完成啦</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const audioPlayer = ref({
  poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
  name: '致爱丽丝',
  author: '暂无',
})
const audioAction = ref({
  method: 'pause',
})
const doStart = () => {
  uni.navigateBack()
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

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 15px 0 20px 0;
}

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
}

.input-area {
  width: 100%;
  height: auto;
}
</style>
