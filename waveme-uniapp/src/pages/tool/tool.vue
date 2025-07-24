<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '工具箱',
  },
  // needLogin: true,
}
</route>
<template>
  <tabbar selected="1"></tabbar>
  <view class="" h-full w-full>
    <wd-navbar fixed safeAreaInsetTop title="工具箱"></wd-navbar>

    <view class="main-container">
      <view style="height: 150rpx"></view>
      <view>
        <img
          src="http://115.159.83.61:9000/tool/tool_logo.png"
          style="width: 200px; height: 200px"
        />
      </view>

      <view class="card-container" v-if="currGroupId === 1">
        <view
          class="card"
          v-for="(tool, index) in toolList1"
          :key="index"
          @click="ToTool(tool.toolName)"
        >
          <img class="img" :src="tool.iconUrl" />
          <view class="grid-font">{{ tool.toolName }}</view>
        </view>
      </view>

      <view class="card-container" v-if="currGroupId === 0">
        <view
          class="card"
          v-for="(tool, index) in toolList0"
          :key="index"
          @click="ToTool(tool.toolName)"
        >
          <img class="img" :src="tool.iconUrl" />
          <view class="grid-font">{{ tool.toolName }}</view>
        </view>
      </view>
      <view style="height: 150rpx"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import tabbar from '@/pages/tabbar/tabbar.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

defineOptions({
  name: 'tool',
})
uni.hideTabBar()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const currGroupId = ref<number>(userStore.userInfo.groupId)
const toolList1 = ref([
  {
    toolName: '心情日记',
    iconUrl: 'http://115.159.83.61:9000/tool/xinqingriji.png',
  },
  {
    toolName: '三件小事',
    iconUrl: 'http://115.159.83.61:9000/tool/nengliangriji.png',
  },
])
const toolList0 = ref([
  {
    toolName: '情绪采集',
    iconUrl: 'http://115.159.83.61:9000/tool/xinqingriji.png',
  },
  {
    toolName: '自动思维',
    iconUrl: 'http://115.159.83.61:9000/tool/zidongsiwei.png',
  },
  {
    toolName: '认知解离',
    iconUrl: 'http://115.159.83.61:9000/tool/renzhijieli.png',
  },
  {
    toolName: '回避档案',
    iconUrl: 'http://115.159.83.61:9000/tool/huibidangan.png',
  },
  {
    toolName: '专注当下',
    iconUrl: 'http://115.159.83.61:9000/tool/zhuanzhudangxia.png',
  },
  {
    toolName: '正念练习',
    iconUrl: 'http://115.159.83.61:9000/tool/zhengnianlianxi.png',
  },
  {
    toolName: '接纳练习',
    iconUrl: 'http://115.159.83.61:9000/tool/jienalianxi.png',
  },
  {
    toolName: '价值手册',
    iconUrl: 'http://115.159.83.61:9000/tool/jiazhishouce.png',
  },
  {
    toolName: '行动计划',
    iconUrl: 'http://115.159.83.61:9000/tool/xingdongjihua.png',
  },
  {
    toolName: '应对计划',
    iconUrl: 'http://115.159.83.61:9000/tool/yingduifufa.png',
  },
])

const ToTool = (toolName: string) => {
  if (toolName === '心情日记') {
    uni.navigateTo({
      url: '/pages/mood/mood',
    })
  } else if (toolName === '三件小事') {
    uni.navigateTo({
      url: '/pages/tool-sanjianxiaoshi/sanjianxiaoshi',
    })
  } else if (toolName === '自动思维') {
    uni.navigateTo({
      url: '/pages/tool-zidongsiwei/zidongsiwei',
    })
  } else if (toolName === '认知解离') {
    uni.navigateTo({
      url: '/pages/tool-renzhijieli/renzhijieli',
    })
  } else if (toolName === '回避档案') {
    uni.navigateTo({
      url: '/pages/tool-huibidangan/huibidangan',
    })
  } else if (toolName === '专注当下') {
    uni.navigateTo({
      url: '/pages/tool-zhuanzhudangxia/zhuanzhudangxia',
    })
  } else if (toolName === '正念练习') {
    uni.navigateTo({
      url: '/pages/tool-zhengnianlianxi/zhengnianlianxi',
    })
  } else if (toolName === '接纳练习') {
    uni.navigateTo({
      url: '/pages/tool-jienalianxi/jienalianxi',
    })
  } else if (toolName === '价值手册') {
    uni.navigateTo({
      url: '/pages/tool-jiazhishouce/jiazhishouce',
    })
  } else if (toolName === '行动计划') {
    uni.navigateTo({
      url: '/pages/tool-xingdongjihua/xingdongjihua',
    })
  } else if (toolName === '应对计划') {
    uni.navigateTo({
      url: '/pages/tool-yingduijihua/yingduijihua',
    })
  } else if (toolName === '情绪采集') {
    uni.navigateTo({
      url: '/pages/tool-qingxucaiji/qingxucaiji',
    })
  }
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.img {
  width: 45px;
  height: 45px;
}

.grid-font {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}

.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.card {
  display: flex;
  align-items: center;
  width: 40%;
  height: 60px;
  padding: 10px;
  margin: 18px 0 18px 0;
  border-color: darkgrey;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgb(139, 139, 139);
}
</style>
