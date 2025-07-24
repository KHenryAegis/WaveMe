<template>
  <view class="tab-bar">
    <view
      v-for="(item, index) in tabBarList"
      :key="index"
      :class="{ 'tab-bar-item': true, currentTar: selected == item.id }"
      @click="switchTab(item)"
    >
      <view class="tab_text" :style="{ color: selected == index ? selectedColor : color }">
        <image
          class="tab_img"
          :src="selected == index ? item.selectedIconPath : item.iconPath"
        ></image>
        <view>{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  selected: {
    type: Number,
    default: 0,
  },
})

const color = ref('#000')
const selectedColor = ref('#5A9685')
const tabBarList = ref([
  {
    id: 0,
    pagePath: '/pages/home/index',
    iconPath: '../../static/tabbar/location.png',
    selectedIconPath: '../../static/tabbar/locationHL.png',
    text: 'NFC测试',
  },
  {
    id: 1,
    pagePath: '/pages/my/index',
    iconPath: '../../static/tabbar/personal.png',
    selectedIconPath: '../../static/tabbar/personalHL.png',
    text: '个人中心',
  },
])

const switchTab = (item: any) => {
  uni.switchTab({
    url: item.pagePath,
  })
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 25rpx;
  left: 15rpx;
  right: 15rpx;
  height: 100rpx;
  background: white;
  padding: 20rpx;
  border-radius: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83) !important;

  .currentTar {
    border-radius: 15rpx;
    box-shadow: 0 0 15px #d7d7d7ff !important;
    transition: all 0.5s ease-in-out;
  }

  .tab-bar-item {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150rpx;
    padding: 15rpx;
    background-color: transparent;
    transition: all 0.5s ease-in-out;
    margin: auto;

    .tab_img {
      width: 37rpx;
      height: 41rpx;
    }

    .tab_text {
      font-size: 20rpx;
      margin-top: 9rpx;
      flex: 1;
    }
  }
}
</style>