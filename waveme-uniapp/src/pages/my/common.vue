<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人信息',
  },
  // needLogin: true,
}
</route>
<template>
  <wd-navbar
    fixed
    safeAreaInsetTop
    :title="navbarTitle"
    left-text="返回"
    left-arrow
    @click-left="doOperation"
  ></wd-navbar>
  <view class="main-container">
    <!-- <view style="height: 200rpx"></view> -->
    <view :style="{ marginTop: top + 44 + 'px' }">
      <!-- 只显示一张图片 -->
      <image :src="imgUrl" mode="widthFix" style="width: 100%" />
    </view>

    <!-- <view class="operation-area">
      <view class="operation-btn" @click="doOperation">
        <img :src="operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">返回</view>
      </view>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
const username = ref('')

const imgUrl = ref('')
const operationIcon = 'http://115.159.83.61:9000/common/back.png'
const navbarTitle = ref('')
const top = ref(0)
const groupId = ref(0)
// onLoad(() => {
//   console.log(userStore.userInfo)
// })
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

onLoad(async (param) => {
  imgUrl.value = 'http://115.159.83.61:9000/' + param.url
  console.log('imgUrl:', imgUrl.value)

  groupId.value = param.groupId
  console.log('groupId:', groupId.value)

  navbarTitle.value = param.title

  console.log('safeAreaInsets', safeAreaInsets)
  top.value = safeAreaInsets.top
})

const doOperation = () => {
  uni.switchTab({ url: '/pages/my/my' })
}
</script>

<style>
.main-container {
  /* height: 1000px;
  overflow: hidden; */
  background: rgb(237, 248, 243);
}

.operation-area {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 85%;
  height: auto;
  margin: 20px auto;
}

.operation-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: auto;
}
</style>
