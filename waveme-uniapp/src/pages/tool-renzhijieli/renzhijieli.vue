<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '心情日记',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="认知解离" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view style="height: 15%"></view>

    <view class="big-icon">
      <img
        style="width: 200px; height: 180px"
        src="http://115.159.83.61:9000/tool/renzhijieli/renzhijieli-logo.png"
      />
    </view>
    <view class="title">认知解离</view>
    <view class="font">我是我，想法是想法，我不被想法定义</view>
    <view class="small-font">下面两个正念练习将帮助你将自己和想法区分开</view>
    <view>
      <wd-card>
        <view class="card-content" @click="toDistance">
          <view class="card-title">与想法拉开距离</view>
          <view><wd-icon name="fullsreen" size="26px"></wd-icon></view>
        </view>
      </wd-card>
      <wd-card>
        <view class="card-content" @click="ToLeaf">
          <view class="card-title">随溪飘走的落叶</view>
          <view><wd-icon name="format-vertical-align-right" size="26px"></wd-icon></view>
        </view>
      </wd-card>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const handleClickLeft = () => {
  uni.navigateBack()
}

const toDistance = () => {
  uni.navigateTo({
    url: '/pages/tool-renzhijieli/distance',
  })
}

const ToLeaf = () => {
  uni.navigateTo({
    url: '/pages/tool-renzhijieli/leaf',
  })
}
</script>

<style>
.font {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.title {
  margin-top: 12px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.small-font {
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.big-icon {
  display: flex;
  justify-content: center;
  margin-top: 20%;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 20px;
  color: black;
}
</style>
