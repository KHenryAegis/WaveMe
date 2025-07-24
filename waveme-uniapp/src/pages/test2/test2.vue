/* stylelint-disable order/properties-order */
<route lang="json5">
{
  style: {},
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="container">
      <view class="logo">
        <img src="../../static/images/Starbucks_Logo_1987.png" alt="GAREA盖睿智能医疗" />
      </view>
      <view class="form">
        <input class="input" type="text" placeholder="请输入用户账号" />
        <input class="input" type="password" placeholder="请输入用户密码" />
        <button class="login-button" @click="login">登录</button>
        <text class="forgot-password" @click="forgotPassword">忘记密码？</text>
        <text class="register" @click="register">立即注册！</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'login',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const login = () => {
  // 登录逻辑
}

const forgotPassword = () => {
  // 忘记密码逻辑
}

const register = () => {
  // 注册逻辑
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  margin-bottom: 20px;
}

.input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  padding: 10px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
  background-color: #007aff;
  border: none;
  border-radius: 4px;
}

.forgot-password,
.register {
  margin-top: 10px;
  color: #007aff;
  cursor: pointer;
}
</style>
