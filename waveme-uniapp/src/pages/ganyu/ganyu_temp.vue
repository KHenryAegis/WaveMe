<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '临时页面',
  },
  needLogin: true,
}
</route>
<template>
  <view class="bg-white pt-2 px-4" :style="{ marginTop: safeAreaInsets?.top + 'px' }" w-full h-full>
    <wd-navbar title="干预" left-arrow @click-left="ToHome()"></wd-navbar>
    <view class="header">
      <h1>临时页面</h1>
    </view>
    <view class="illustration">
      <view class="illustration-placeholder">
        <img src="../../static/images/wenjuan.png" alt="" />
      </view>
    </view>
    <view class="instructions">
      <p>这是一个临时页面</p>
    </view>
    <button class="start-button" @click="toA">去第二站导入页面</button>
    <!-- <button class="start-button" @click="toLogin">跳转登录</button>
    <button class="start-button" @click="checkLogin">检查登录</button>
    <button class="start-button" @click="logoutByToken">退出登录</button> -->
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store/user'
import { logout, test } from '@/service/index/user'
import tabbar from '@/pages/tabbar/tabbar.vue'

const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)

// uni.hideTabBar()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const toA = () => {
  uni.navigateTo({
    url: '/pages/1/daoru/1',
  })
}

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
</script>

<style></style>
