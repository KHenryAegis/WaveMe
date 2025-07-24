<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的旅程',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="用户管理" left-arrow @click-left="ToHome"></wd-navbar>
  </view>

  <view class="container">
    <wd-toast></wd-toast>
    <view class="form-box">
      <!-- 手机号输入 -->
      <view class="input-group">
        <text class="label">手机号</text>
        <input
          type="number"
          v-model="phone"
          maxlength="11"
          placeholder="请输入手机号"
          class="input"
        />
      </view>

      <!-- 选项选择 -->
      <view class="input-group">
        <text class="label">选项</text>
        <view class="radio-group">
          <label class="radio-item" @tap="selectOption(1)">
            <view class="radio-circle" :class="{ selected: chooseGroupId === 1 }"></view>
            <text>对照组（groupId:1）</text>
          </label>
          <label class="radio-item" @tap="selectOption(0)">
            <view class="radio-circle" :class="{ selected: chooseGroupId === 0 }"></view>
            <text>实验组（groupId:0）</text>
          </label>
        </view>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @tap="handleSubmit">提交</button>
    </view>
  </view>

  <view class="admin-container" v-if="flag">
    <wd-card title="已录入的用户表">
      <wd-table :data="userInfo">
        <wd-table-col prop="phone" label="手机号" width="200"></wd-table-col>
        <wd-table-col prop="groupId" label="组别" width="150"></wd-table-col>
      </wd-table>
    </wd-card>
    <!-- <wd-table :data="userInfo">
      <wd-table-col prop="phone" label="手机号" width="150"></wd-table-col>
      <wd-table-col prop="groupId" label="组别"></wd-table-col>
    </wd-table> -->
  </view>

  <wd-popup v-model="show" custom-style="padding: 0;" :close-on-click-modal="false">
    <view class="popup-container">
      <view class="input-container">
        <wd-input
          v-model="phoneNumber"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          clearable
        />
      </view>
      <view class="input-container">
        <wd-input v-model="group" placeholder="请输入组别" type="text" clearable />
      </view>
      <view class="button-container">
        <wd-button type="primary" @click="submit">提交</wd-button>
        <wd-button type="default" @click="showPopup = false">取消</wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { exportExcelApi, getAccessTokenApi, setUserGroupApi } from '@/service/admin/admin'
import { getAllUserInfo, User, getAllPreUserInfo } from '@/service/index/user'
import { useMessage, useToast } from 'wot-design-uni'

const phone = ref()
const curopenid = ref()
const toast = useToast()
const { safeAreaInsets } = uni.getSystemInfoSync()
const show = ref(false)
const userInfo = ref([])
const flag = ref(false)
const currentUser = ref('')
const curGroup = ref('')
const chooseGroupId = ref()
const access_token = ref()
const dataList = reactive([
  {
    avatar: '',
    currProgress: 3,
    groupId: 0,
    phone: '1234567890',
    role: 'user',
    userId: 'osz0n7fy5OCWb79AiihERzPCrUC8',
    username: '杨宗',
    wechatId: '微信id',
    wechatName: '微信name',
  },
])

onLoad(async () => {
  const res = await getAllPreUserInfo()
  console.log(res)
  userInfo.value = res.data
  console.log(userInfo.value)
  flag.value = true
})

const addUser = () => {
  show.value = true
}
const edit = (row) => {
  curopenid.value = row.userId
  console.log(row)
  currentUser.value = row.phone
  if (row.groupId === 0) {
    curGroup.value = '对照组'
  } else {
    curGroup.value = '实验组'
  }
  show.value = true
}
const onCancel = () => {
  show.value = false
}
const toAdminInquiry = () => {
  uni.redirectTo({
    url: '/pages/admin/inquiry',
  })
}

const ToHome = () => {
  uni.switchTab({
    url: '/pages/my/my',
  })
}

const selectOption = (option) => {
  chooseGroupId.value = option
}

const handleSubmit = async () => {
  const res = await setUserGroupApi(phone.value, chooseGroupId.value)

  console.log(res)
  if (res.code === 200) {
    toast.success('设置成功')
    const res = await getAllPreUserInfo()
    console.log(res)
    userInfo.value = res.data
  }
}
</script>

<style>
.popup-container {
  position: relative;
  width: 350px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.arrow {
  position: absolute;
  top: -10px;
  left: 50%;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #ffffff;
  border-left: 10px solid transparent;
  transform: translateX(-50%);
}

.content {
  padding: 20px;
}

.info-row,
.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.label {
  flex-shrink: 0;
  width: 120px;
  font-size: 14px;
  color: #666;
}

.value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.input {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  flex: 1;
  height: 36px;
  font-size: 14px;
  border: none;
  border-radius: 18px;
}

.cancel-btn {
  margin-right: 10px;
  color: #666;
  background-color: #f5f5f5;
}

.confirm-btn {
  color: #ffffff;
  background-color: #007aff;
}

.container {
  /* padding: 30rpx; */
}

.form-box {
  padding: 40rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 40rpx;
}

.label {
  display: block;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.input {
  height: 80rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  border: 2rpx solid #eee;
  border-radius: 12rpx;
}

.radio-group {
  display: flex;
  gap: 40rpx;
}

.radio-item {
  display: flex;
  gap: 12rpx;
  align-items: center;
}

.radio-circle {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ddd;
  border-radius: 50%;
}

.radio-circle.selected {
  border-color: #007aff;
}

.radio-circle.selected::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24rpx;
  height: 24rpx;
  content: '';
  background: #007aff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.submit-btn {
  height: 88rpx;
  margin-top: 60rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  color: #fff;
  background: #007aff;
  border-radius: 12rpx;
}

.submit-btn[disabled] {
  color: #fff;
  background: #ccc;
}
</style>
