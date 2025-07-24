<template>
  <!--  外部Div  -->
  <view class="tab-bar">
    <!--  循环每个 item 菜单 -->
    <view
      v-for="(item, index) in tabBarList"
      :key="index"
      :class="{ 'tab-bar-item': true, currentTar: selected == item.id }"
      @click="switchTab(item, index)"
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
<script setup>
import { defineProps, ref } from 'vue'

// 子组件传递参数
const props = defineProps({
  selected: {
    type: Number,
    default: 0,
  },
})

// 为选中颜色
const color = ref('#000')
// 选中的颜色
const selectedColor = ref('#5A9685')
// 菜单栏集合 - 与 pages.json -> tabbar 配置一样
const tabBarList = ref([
  {
    id: 0,
    pagePath: '/pages/home/home',
    iconPath: '../../static/tabbar/location.png',
    selectedIconPath: '../../static/tabbar/locationHL.png',
    text: '悦心旅程',
  },
  {
    id: 1,
    pagePath: '/pages/tool/tool',
    iconPath: '../../static/tabbar/tool.png',
    selectedIconPath: '../../static/tabbar/toolHL.png',
    text: '工具箱',
  },
  {
    id: 2,
    pagePath: '/pages/my/my',
    iconPath: '../../static/tabbar/personal.png',
    selectedIconPath: '../../static/tabbar/personalHL.png',
    text: '个人中心',
  },
])

// 跳转tabBar菜单栏
const switchTab = (item) => {
  const url = item.pagePath
  uni.switchTab({
    url,
  })
}
</script>
<style lang="less" scoped>
// 外部装修
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

  // 当前点击的
  .currentTar {
    border-radius: 15rpx;
    box-shadow: 0 0 15px #d7d7d7ff !important;
    transition: all 0.5s ease-in-out;
  }

  // 给每个 item 设置样式
  .tab-bar-item {
    //flex: 0.5;
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

    // 限制每个icon的大小
    .tab_img {
      width: 37rpx;
      height: 41rpx;
    }

    // 限制文字大小
    .tab_text {
      font-size: 20rpx;
      margin-top: 9rpx;
      flex: 1;
    }
  }
}
</style>
