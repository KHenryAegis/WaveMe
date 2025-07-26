<template>
  <div id="app">
    <PhotoEditor :photoData="initialPhotoData" :bracelet-id="braceletId" @save="handleSave" @cancel="handleCancel" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PhotoEditor from './components/PhotoEditor.vue'; // 假设你的组件名为 PhotoEditor.vue

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 获取手环ID
const braceletId = route.params.id

const initialPhotoData = ref({
  title: '我的专属相册',
  subtitle: '记录生活中的美好瞬间',
  photos: [
    {
      id: 'p1', // 最好有一个唯一ID
      url: 'https://picsum.photos/id/237/800/600',
      title: '可爱的狗狗',
      description: '一只友善的拉布拉多在草地上玩耍。',
      date: '2023-01-15'
    },
    {
      id: 'p2',
      url: 'https://picsum.photos/id/1018/800/600',
      title: '山间日出',
      description: '清晨，太阳从山峦后面缓缓升起，景色宜人。',
      date: '2023-03-22'
    },
    {
      id: 'p3',
      url: 'https://picsum.photos/id/1040/800/600',
      title: '城市夜景',
      description: '繁华都市的夜晚，灯火辉煌，流光溢彩。',
      date: '2023-05-10'
    }
  ]
});

const handleSave = (data) => {
  console.log('保存的数据:', data);
  // 在这里可以将 data 发送到后端 API
  initialPhotoData.value = data; // 更新父组件数据以反映保存
};

const handleCancel = () => {
  console.log('取消编辑');
  // 不做任何操作，因为组件内部已经恢复了
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #121212;
  color: #fff;
}
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 20px; */
  box-sizing: border-box;
}
</style>