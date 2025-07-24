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
  <tabbar selected="2"></tabbar>
  <view
    class="bg-white overflow-hidden pt-10 px-2 box-border"
    style="
      height: 100vh;
      overflow: scroll;
      background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
    "
  >
    <div class="profile-container">
      <div class="user-info mb-4">
        <div class="avatar">
          <!-- <img src="@/static/" alt="User avatar" /> -->
          <button
            open-type="chooseAvatar"
            @chooseavatar="onChooseavatar"
            class="avatar-wrapper"
            hover-class="none"
          >
            <image :src="avator" alt="" class="w-20 h-20" mode="widthFix" />
          </button>

          <!-- <img :src="avator" alt="" class="w-20 h-20" mode="widthFix" /> -->
          <!-- <wd-img src="../../../../static/images/wenjuan.png"></wd-img> -->
          <!-- <view class="ml-4">
            <wd-icon name="jump" />
          </view> -->
        </div>
        <view class="flex">
          <view class="name-container">
            <span class="mr-2">{{ userInfo.username }}</span>
            <view class="name-icon" @click="setName">
              <wd-icon name="jump" />
            </view>
          </view>

          <!-- <view class="flex items-center absolute name-icon" @click="setName">
            <wd-icon name="jump" />
          </view> -->
        </view>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">2</span>
          <span class="stat-label">已解锁单元</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">10</span>
          <span class="stat-label">已获得金币</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">40</span>
          <span class="stat-label">待解锁金币</span>
        </div>
      </div>

      <div class="menu-items">
        <div class="menu-item">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">新手指南</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toRexian">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/rexiandianhua.png"
            />
          </view>

          <span class="label ml-4">心理危机热线</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toEmail">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/zixun.png"
            />
          </view>
          <span class="label ml-4">咨询师信箱</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toFeedBack">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/yijian.png"
            />
          </view>
          <span class="label ml-4">意见反馈</span>
          <span class="arrow">›</span>
        </div>

        <div class="menu-item">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/guanyu.png"
            />
          </view>
          <span class="label ml-4">关于我们</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toadmin()" v-if="userInfo.role == 'admin'">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">进入管理员页面</span>
          <span class="arrow">›</span>
        </div>
        <!-- <div class="menu-item" @click="toLogin()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">进入登录页面</span>
          <span class="arrow">›</span>
        </div> -->

        <!-- <div class="menu-item" @click="toEval()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">测试回顾页面</span>
          <span class="arrow">›</span>
        </div> -->
      </div>
      <!-- <view class="flex justify-center mt-4" v-if="userInfo.username == '未登录用户'">
        <wd-button type="success" @click="toLogin">登录</wd-button>
      </view> -->
      <view class="flex justify-center mt-4">
        <wd-button type="success" @click="toLogin">登录</wd-button>
      </view>
      <view style="height: 150rpx"></view>
    </div>
    <wd-message-box />
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store/user'
import { logout, test, setUserAvatar, setUserName } from '@/service/index/user'
import { uploadImg } from '@/service/common/upload'
import tabbar from '@/pages/tabbar/tabbar.vue'
import { IInterPage, useInterStore } from '@/store/inter'
import { useMessage, useToast } from 'wot-design-uni'
import { exportExcelApi } from '@/service/admin/admin'

const message = useMessage()
const toast = useToast()

const interStore = useInterStore()
const avator = ref('http://115.159.83.61:9000/common/avatar.png')
const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)
const baseURL = ref('http://115.159.83.61:9000/mindease/')

const username = ref('')

uni.hideTabBar()
defineOptions({
  name: 'my',
})

// onLoad(() => {
//   console.log(userStore.userInfo)
// })

onShow(() => {
  userInfo.value = userStore.userInfo
  console.log('userInfo:', userInfo.value)

  if (Object.keys(userInfo.value).length === 0 && userInfo.value.constructor === Object) {
    // 如果 userInfo.value 是一个空对象，则执行以下代码
    getUserInfo()
  } else {
    avator.value = userInfo.value.avatar
  }
})

const toAboutUs = () => {
  const params = {
    url: 'home/mine-5.png',
    groupId: 0,
    title: '意见反馈',
  }
  uni.redirectTo({
    url:
      '/pages/my/common?' +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&'),
  })
}

const toFeedBack = () => {
  const params = {
    url: 'home/mine-5.png',
    groupId: 0,
    title: '意见反馈',
  }
  uni.redirectTo({
    url:
      '/pages/my/common?' +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&'),
  })
}

const toEmail = () => {
  const params = {
    url: 'home/mine-4.png',
    groupId: 0,
    title: '咨询师信箱',
  }

  console.log('params', params)
  uni.redirectTo({
    url:
      '/pages/my/common?' +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&'),
  })
}

const toRexian = () => {
  const params = {
    url: 'home/mine-3.png',
    groupId: 0,
    title: '心理危机热线',
  }
  uni.redirectTo({
    url:
      '/pages/my/common?' +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&'),
  })
}

const getUserInfo = () => {
  console.log('获取用户信息')
}
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const logoutByToken = async () => {
  const res = await logout()
  console.log(res)
  if (res.code === 200) {
    userStore.clearUserInfo()
    uni.switchTab({
      url: '/pages/my/my',
    })
  }
}

const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

const toEval = () => {
  uni.navigateTo({
    url: '/pages/inquiry/success',
  })
}

const toInquiry = () => {
  uni.navigateTo({
    url: '/pages/inquiry/inquiry?position=' + '0-post',
  })
  // uni.redirectTo({
  //   url: '/pages/inquiry/end',
  // })
}

const toFirst = () => {
  uni.navigateTo({
    url: '/pages/inquiry/first',
  })
}

const checkLogin = () => {
  uni.navigateTo({
    url: '/pages/test2/test2',
  })
}

const testAPI = async () => {
  const res = await test()
  console.log(res)
}

const toadmin = () => {
  uni.redirectTo({
    url: '/pages/admin/admin',
  })
}

const submitInter = () => {
  console.log('模拟提交干预')
}

const clear = () => {
  console.log('测试清楚干预缓存')
  interStore.clearInternfo()
}

const onChooseavatar = async (e) => {
  console.log('选择头像')
  console.log('e:', e)
  const { avatarUrl } = e.detail
  console.log('avatarUrl:', avatarUrl)

  const randomName = generateRandomString(10) + '.png'

  // 通过 fetch 从 URL 下载图片文件
  await uni.uploadFile({
    url: 'https://mindease.online:28081/upload/img', // 仅为示例，非真实的接口地址
    filePath: avatarUrl,
    name: 'img',
    formData: {
      name: randomName,
    },
    success: async (uploadFileRes) => {
      console.log('success')

      userInfo.value.avatar = baseURL.value + randomName
      avator.value = userInfo.value.avatar
      console.log(avator.value)

      const res = await setUserAvatar(avator.value)
      console.log(res)
    },
    fail: (fail) => {
      console.log('fail')
      console.log(fail)
    },
  })

  // const res = await uploadImg(formData)
  // console.log(res)
}

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const setName = () => {
  console.log('修改用户名')
  message
    .prompt({
      title: '请输入要修改的用户名',
      inputValue: username.value,
    })
    .then(async (resp) => {
      console.log(resp)
      console.log(username.value)
      username.value = resp.value
      const res = await setUserName(resp.value)
      if (res.code === 200) {
        toast.success('修改成功')
        userInfo.value.username = username.value
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const exportExcel = async () => {
  console.log('导出excel')
  // toast.loading('导出中...')
  console.log('导出excel')
  console.log('22')

  // uni.downloadFile({
  //   url: 'https://localhost:443/upload/excel', // 仅为示例，并非真实的资源
  //   success: (res) => {
  //     if (res.statusCode === 200) {
  //       const filePath = res.tempFilePath
  //       console.log('下载成功')
  //       uni.openDocument({
  //         filePath,
  //         success: function (res) {
  //           console.log('打开文档成功')
  //         },
  //         fail: function (err) {
  //           console.log('打开文档失败', err)
  //         },
  //       })
  //     }
  //   },
  // })

  // uni.request({
  //   url: 'https://localhost:443/upload/excel',
  //   success: (res) => {
  //     console.log(res)
  //   },
  // })

  const res = await exportExcelApi()
  console.log(res)

  const dataUrl = res.data

  // toast.close()

  console.log(dataUrl)
  console.log(222)
  uni.downloadFile({
    url: dataUrl, // 仅为示例，并非真实的资源
    success: (res) => {
      console.log(res)
      if (res.statusCode === 200) {
        const filePath = res.tempFilePath
        console.log('下载成功')
        uni.openDocument({
          filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (err) {
            console.log('打开文档失败', err)
          },
        })
      }
    },
  })
  console.log(333)
}
</script>

<style>
.profile-container {
  padding: 0.625rem;
  margin-top: 2rem;

  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
  border-radius: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  /* background-color: #d9d9d9; */
  border-radius: 50%;
}

.username {
  margin: 0;
  font-size: 18px;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.menu-items {
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon {
  margin-right: 15px;
  font-size: 20px;
}

.label {
  flex-grow: 1;
  font-size: 18px;
}

.arrow {
  color: #ccc;
}

.name-icon {
  transform: translateY(2rpx);
}
.name-container {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.avatar-wrapper {
  height: 80px;
  padding-right: 0;
  padding-left: 0;
  line-height: 50px;
  background-color: transparent;
  border-color: transparent;
}

.avatar-wrapper::after {
  border: none;
}
</style>
