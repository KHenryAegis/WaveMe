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

  <!-- <view>
    <button @click="toAdminInquiry()">查看问卷数据</button>
  </view> -->
  <view class="admin-container" v-if="flag">
    <wd-table :data="userInfo">
      <wd-table-col label="操作" fixed>
        <template #value="{ row }">
          <view class="custom-class" style="width: 100px">
            <wd-button type="info" size="small" @click="edit(row)">编辑</wd-button>
            <wd-button type="info" size="small" @click="exportSingleExcel(row)">导出</wd-button>
          </view>
        </template>
      </wd-table-col>
      <wd-table-col prop="username" label="微信名"></wd-table-col>
      <wd-table-col prop="phone" label="手机号" width="150"></wd-table-col>
      <wd-table-col prop="currProgress" label="已解锁单元"></wd-table-col>
    </wd-table>
  </view>

  <view class="card">
    <wd-toast />
    <wd-button @click="exportExcel()">导出用户做题数据</wd-button>
  </view>

  <view class="card">
    <wd-button @click="testsub">测试订阅消息</wd-button>
  </view>

  <view class="card">
    <wd-button @click="toAddUser">跳转录入页面</wd-button>
  </view>

  <wd-popup v-model="show" custom-style="padding: 0;" :close-on-click-modal="false">
    <view class="popup-container">
      <view class="arrow"></view>
      <view class="content">
        <view class="info-row">
          <text class="label">当前用户手机号：</text>
          <text class="value">{{ currentUser }}</text>
        </view>

        <view class="info-row">
          <text class="label">当前用户组别：</text>
          <text class="value">{{ curGroup }}</text>
        </view>

        <view class="input-row">
          <text class="label">修改用户组别：</text>
          <!-- <input type="text" v-model="newGroup" class="input" placeholder="请输入新的组别名称" /> -->
          <view class="flex">
            <wd-radio-group v-model="chooseGroupId" shape="button" @change="change">
              <wd-radio :value="1">实验组</wd-radio>
              <wd-radio :value="0">对照组</wd-radio>
            </wd-radio-group>
          </view>
        </view>
        <view>
          <wd-button @click="sendNotice">发送订阅消息</wd-button>
        </view>

        <view class="button-group">
          <button @tap="onCancel" class="btn cancel-btn">取消</button>
          <button @tap="onConfirm" class="btn confirm-btn">确定</button>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import {
  exportExcelApi,
  exportSingleExcelApi,
  getAccessTokenApi,
  setUserGroupApi,
} from '@/service/admin/admin'
import { getAllUserInfo, User } from '@/service/index/user'
import { useMessage, useToast } from 'wot-design-uni'

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
  const res = await getAllUserInfo()
  console.log(res)
  userInfo.value = res.data
  console.log(userInfo.value)
  flag.value = true
})
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

const toAddUser = () => {
  uni.navigateTo({ url: '/pages/admin/user' })
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

const exportSingleExcel = async (row) => {
  console.log('导出excel')
  toast.loading('导出中...')
  curopenid.value = row.userId
  console.log(row)
  currentUser.value = row.phone
  console.log('导出', row)
  const res = await exportSingleExcelApi(row.userId)
  console.log(res)

  const dataUrl = res.data

  toast.close()

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
}

const exportExcel = async () => {
  console.log('导出excel')
  toast.loading('导出中...')
  console.log('导出excel')
  console.log('22')

  const res = await exportExcelApi()
  console.log(res)

  const dataUrl = res.data

  toast.close()

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

const change = () => {
  console.log(chooseGroupId.value)
}

const testsub = () => {
  uni.requestSubscribeMessage({
    tmplIds: ['kAcfm-7a4wnQ03jYBqa_rplhsYjfJXNN71MhlMGADPg'], // 模板ID
    success(res) {
      console.log('123123', res)
    },
    fail(err) {
      console.log('err', err)
    },
  })
}

const getAccessToken = () => {
  // 向后端拿access_token
}

const sendNotice = async () => {
  const res = await getAccessTokenApi()
  console.log(res)
  console.log('curopenid', curopenid.value)
  access_token.value = res.data
  const pushmsg = {
    touser: curopenid.value,
    template_id: 'kAcfm-7a4wnQ03jYBqa_rplhsYjfJXNN71MhlMGADPg',
    data: {
      thing1: {
        value: '下一次干预已解锁',
      },
      thing3: {
        value: '快来完成吧',
      },
    },
  }
  uni.request({
    url:
      'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + access_token.value,
    data: JSON.stringify(pushmsg),
    method: 'POST',
    success: (res) => {
      console.log('发送成功', res)
      const code = res.data.errcode
      if (code == 0) {
        toast.success('发送成功')
      }
      if (code == 43101) {
        toast.error('发送失败，用户没有接收订阅消息')
      }
    },
    fail(err) {
      console.log('发送失败', err)
    },
  })
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

.card {
  display: flex;
  align-items: center;
  height: auto;
  padding: 15px;
  /* background-color: white; */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
