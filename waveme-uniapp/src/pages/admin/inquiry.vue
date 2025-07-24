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
    <wd-navbar title="用户管理"></wd-navbar>
  </view>

  <view>
    <wd-toast />
  </view>
  <view class="admin-container">
    <wd-table :data="dataList">
      <wd-table-col label="操作" fixed>
        <template #value="{ row }">
          <view class="custom-class">
            <wd-button type="info" size="small" @click="edit(row)">编辑</wd-button>
          </view>
        </template>
      </wd-table-col>
      <wd-table-col prop="name" label="姓名"></wd-table-col>
      <wd-table-col prop="school" label="求学之所"></wd-table-col>
      <wd-table-col prop="major" label="组别"></wd-table-col>
    </wd-table>
  </view>

  <view>
    <wd-button @click="exportExcel()">导出excel</wd-button>
  </view>

  <wd-popup v-model="show" custom-style="padding: 0;" :close-on-click-modal="false">
    <view class="popup-container">
      <view class="arrow"></view>
      <view class="content">
        <view class="info-row">
          <text class="label">当前用户：</text>
          <text class="value">{{ currentUser }}</text>
        </view>

        <view class="input-row">
          <text class="label">请输入用户组别：</text>
          <input type="text" v-model="newGroup" class="input" placeholder="请输入新的组别名称" />
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
import { exportExcelApi } from '@/service/admin/admin'
import { useMessage, useToast } from 'wot-design-uni'
import { getAllUserInfo, User } from '@/service/index/user'

const toast = useToast()
const { safeAreaInsets } = uni.getSystemInfoSync()
const show = ref(false)
const dataList = reactive([
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业',
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
  },
])
const edit = (row) => {
  console.log(row)
  show.value = true
}

const exportExcel = async () => {
  console.log('导出excel')
  toast.loading('导出中...')
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
</script>

<style>
.popup-container {
  position: relative;
  width: 300px;
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
</style>
