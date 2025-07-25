<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-50 p-6 font-exo2">
    <transition name="fade-scale" mode="out-in">
      <h1 key="title" class="text-4xl font-bold text-center mb-8">
        我的兴趣生活
      </h1>
    </transition>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(hobby, idx) in hobbies"
        :key="hobby.slug"
        class="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg"
        @mouseenter="hovered = idx"
        @mouseleave="hovered = null"
      >
        <transition
          :name="hovered === idx ? 'wiggle' : ''"
          appear
        >
          <img
            :src="hobby.icon"
            :alt="hobby.title"
            class="w-20 h-20 mb-3"
          />
        </transition>
        <span class="text-lg font-medium mb-2">
          {{ hobby.title }}
        </span>
        <router-link
          :to="{ name: 'HobbyDetail', params: { slug: hobby.slug } }"
          class="mt-auto px-4 py-1 bg-blue-500 text-white rounded-lg transform transition-transform duration-200 hover:scale-105"
        >
          查看详情
        </router-link>
      </div>
    </div>

    <footer class="mt-10 text-center text-sm text-gray-500">
      动态生活，由你创造 © {{ year }}
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const defaultIcon = '/hobbies/placeholder.png';
const hobbies = [
  { slug: 'pet', title: '宠物日常', icon: defaultIcon },
  { slug: 'programming', title: '学习编程', icon: defaultIcon },
  { slug: 'film', title: '影视观赏', icon: defaultIcon },
  { slug: 'badminton', title: '羽毛球', icon: defaultIcon },
  // ...其他爱好
];
const hovered = ref(null);
const year = new Date().getFullYear();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap');
.font-exo2 { font-family: 'Exo 2', sans-serif; }

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.6s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes wiggle {
  0%,100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}
.wiggle-enter-active {
  animation: wiggle 1s infinite;
}
</style>