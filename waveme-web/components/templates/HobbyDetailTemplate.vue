<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 font-exo2">
    <router-link to="/" class="text-blue-600 hover:underline">← 返回</router-link>
    <div class="flex flex-col items-center mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
      <img :src="data.icon" :alt="data.title" class="w-30 h-30 mb-4" />
      <h1 class="text-3xl font-bold mb-4">{{ data.title }}</h1>
      <p class="text-gray-700 text-center max-w-2xl mb-6">{{ data.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const defaultIcon = '/hobbies/placeholder.png';
const hobbyData = {
  pet: { title: '宠物日常', icon: defaultIcon, content: '这里是宠物的详情介绍，例如日常护理、趣味瞬间。' },
  programming: { title: '学习编程', icon: defaultIcon, content: '分享编程学习资源、项目实践与心得。' },
  film: { title: '影视观赏', icon: defaultIcon, content: '推荐好片，交流观影感受。' },
  badminton: { title: '羽毛球', icon: defaultIcon, content: '讨论打法技巧，一起约球。' },
  // ...其他
};
const route = useRoute();
const slug = route.params.slug;
const data = hobbyData[slug] || { title: '未知', icon: defaultIcon, content: '暂无内容' };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap');
.font-exo2 { font-family: 'Exo 2', sans-serif; }
</style>