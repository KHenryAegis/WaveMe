<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="行动计划" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/xingdongjihua/xingdongjihua1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">首先，为你的魔法行动指南起一个名字：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.jihuaName" placeholder="名字是……" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/xingdongjihua/xingdongjihua2.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">我想要改变的一个生活领域：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.lingyu" placeholder="输入一个生活领域" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">在这个生活领域里，我的价值是：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.jiazhi" placeholder="输入你的价值" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">我的价值意图：</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.yitu" placeholder="输入你的价值意图" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第三步 -->
    <view class="main-container" v-show="currIndex === 2">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/xingdongjihua/xingdongjihua3.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">
          在你所选择的生活领域里，基于你想追求的价值和价值意图，你的目标是什么？
        </view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.mubiao" placeholder="请输入你的目标" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第四步 -->
    <view class="main-container" v-show="currIndex === 3">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/xingdongjihua/xingdongjihua4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">针对你的目标，你所能做的最小、最简单的一步是什么？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.xingdong" placeholder="请输入你的小小行动" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">你打算什么时候开始做？请输入一个尽量准确的时间；</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.xingdongTime" placeholder="请输入你的行动时间" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">你觉得你遇到的障碍可能是什么？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.zhangai" placeholder="请输入你可能遇到的障碍" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">如果这个障碍真的发生了，你打算如何应对（越具体越好）</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="submitObj.yingdui" placeholder="输入你的应对策略" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一页</view>
      </view>
    </view>

    <!-- 第五步 -->
    <view class="main-container" v-show="currIndex === 4">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/tool/xingdongjihua/xingdongjihua5.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="doSubmit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/back.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">返回任务主页</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { submitXingdongjihua, IXingdongjihua } from '@/service/index/xingdongjihua'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const currIndex = ref<number>(0)
const submitObj = ref<IXingdongjihua>({
  userId: '',
  date: '',
  jihuaName: '',
  lingyu: '',
  jiazhi: '',
  yitu: '',
  mubiao: '',
  xingdong: '',
  xingdongTime: '',
  zhangai: '',
  yingdui: '',
})
const userStore = useUserStore()
const message = useMessage()

const toNext = () => {
  currIndex.value = currIndex.value + 1
}

const goBack = () => {
  uni.navigateBack()
}
const doSubmit = async () => {
  submitObj.value.userId = userStore.userInfo.userId
  submitObj.value.date = getFormattedDate().split(' ')[0]

  const res = await submitXingdongjihua(submitObj.value)
  if (res.code === 200) {
    uni.navigateBack({ delta: 1 })
  } else {
    message.alert('网络错误！')
  }
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* margin-top: 30rpx; */
  /* padding: 10px; */
}

.middle-img-common {
  width: 100%;
  height: auto;
}

.input-area {
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 15px 0 20px 0;
}

.select-btns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
}
.select-btn {
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  opacity: 0.6;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.select-btn:hover,
.select-btn.selected {
  opacity: 1;
  transform: scale(1.1);
}
.select-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
